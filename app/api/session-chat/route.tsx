import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();

    if (!notes || !selectedDoctor) {
        return NextResponse.json({ error: "Missing notes or selectedDoctor" }, { status: 400 });
    }

    try {
        const sessionId = uuidv4();
        const result = await db.insert(SessionChatTable).values({
            sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
            notes,
            selectedDoctor,
            createdOn: new Date().toString()
    }).returning();
    return NextResponse.json(result[0]);
    } catch (e) {
        console.error("SessionChat POST error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const user = await currentUser();
    if(sessionId=='all'){
        const result = await db.select().from(SessionChatTable)
     // @ts-expect-error
    .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress ))
    .orderBy(desc(SessionChatTable.id));

    return NextResponse.json(result);

    }
    else{
        const result = await db.select().from(SessionChatTable)
     // @ts-expect-error
    .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(result[0]);

    }
    

}