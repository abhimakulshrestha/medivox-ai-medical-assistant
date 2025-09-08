import { openai } from "@/config/OpenAIModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-chat-v3.1:free',
    messages: [
      {role:'system', content:JSON.stringify(AIDoctorAgents)},
      {
        role: 'user',
        content: 'User notes/Symptoms ' + notes + ', depends on user notes and symptoms. Please suggest list of doctors. Return object in JSON only',
      },
    ],
  });
    const rawResp = completion.choices[0].message;
    const Resp = (rawResp.content ?? "").trim();
  const JSONresp = JSON.parse(Resp);
  console.log("Parsed JSON response:", JSON.stringify(JSONresp, null, 2));
  return NextResponse.json(JSONresp);
  } catch (e) {
    return NextResponse.json(e);
  }
}