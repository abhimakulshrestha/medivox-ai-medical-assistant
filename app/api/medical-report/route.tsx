import { db } from "@/config/db";
import { openai } from "@/config/OpenAIModel";
import { SessionChatTable } from "@/config/schema";
import { AIDoctorAgents } from "@/shared/list";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor AI Agent info and Conversation between AI medical agent and user  transcript, generate a structured report with the following fields:

sessionId: a unique session identifier
agent: the medical specialist name (e.g., "General Physician AI")
user: name of the patient or "Anonymous" if not provided
timestamp: conversation date and time in ISO format
chiefComplaint: one-sentence summary of the main health concern
summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
symptoms: list of symptoms mentioned by the user
duration: how long the user has experienced the symptoms
severity: mild, moderate, or severe
medicationsMentioned: list of any medicines mentioned
recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
"sessionId": "string",
"agent": "string",
"user": "string",
"timestamp": "ISO Date string",
"chiefComplaint": "string",
"summary": "string",
"symptoms": ["symptom1", "symptom2"],
"duration": "string",
"severity": "string",
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
}
Only include valid fields. Respond with nothing else.
`

export async function POST(req:NextRequest){
  try {
    const {sessionId,sessionDetail,messages} = await req.json();
    console.log('[API] Received payload:', { sessionId, sessionDetail, messages });
    if (!sessionId || !sessionDetail || !messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('[API] Missing or invalid data for report generation.', { sessionId, sessionDetail, messages });
      return NextResponse.json({ error: 'Missing or invalid data for report generation.' });
    }
    const UserInput = "AI Doctor Agent Info:"+JSON.stringify(sessionDetail)+", Conversation:"+JSON.stringify(messages);
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3.1:free',
      messages: [
        {role:'system', content:REPORT_GEN_PROMPT},
        {role: 'user', content: UserInput},
      ],
    });
    const rawResp = completion.choices[0].message;
    const Resp = (rawResp.content ?? "").trim();
    console.log('[API] OpenAI raw response:', Resp);
    let JSONresp;
    try {
      JSONresp = JSON.parse(Resp);
      console.log('[API] Parsed report JSON:', JSONresp);
    } catch (parseErr) {
      console.error('[API] Failed to parse report JSON:', Resp, parseErr);
      return NextResponse.json({ error: 'Failed to parse report JSON', raw: Resp });
    }
    // Validate required fields in JSONresp
    if (!JSONresp.sessionId || !JSONresp.agent || !JSONresp.timestamp) {
      console.error('[API] Report JSON missing required fields:', JSONresp);
      return NextResponse.json({ error: 'Report JSON missing required fields', json: JSONresp });
    }
    const result = await db.update(SessionChatTable).set({
      report: JSONresp,
      conversation: messages
    }).where(eq(SessionChatTable.sessionId, sessionId));
    console.log('[API] Database update result:', result);
    if (!result || (result.rowCount !== undefined && result.rowCount === 0)) {
      console.error('[API] No session found to update for sessionId:', sessionId);
      return NextResponse.json({ error: 'No session found to update', sessionId });
    }
    console.log('[API] Report successfully saved to database.');
    return NextResponse.json(JSONresp);
  } catch (e: any) {
    console.error('[API] Error in report generation API:', e);
    return NextResponse.json({ error: e && e.message ? e.message : String(e) });
  }
}