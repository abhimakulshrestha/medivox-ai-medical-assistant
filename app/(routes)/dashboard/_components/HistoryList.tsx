"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

function HistoryList(){
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    useEffect(() => {
        GetHistoryList();
}, []);

    const GetHistoryList = async() => {
        const result  = await axios.get('/api/session-chat?sessionId=all');
        console.log(result.data);
        setHistoryList(result.data);
        
    }
    return(
        <div className  ='mt-10'>
            {historyList.length == 0 ? 
            <div className ='flex items-center justify-center flex-col p-7 border border-dashed border-gray-300 border-2 rounded-2xl'>
                <Image src = {'/medical-assistance.png'} alt = 'No history available'
                width={250}
                height= {250}/>
                <h2 className = 'font-bold text-xl mt-2'>No Recent Consultation</h2>
                <p>You have not had any consultations yet.</p>
                <AddNewSessionDialog />
            </div>:
            <div> <HistoryTable historyList={historyList} /></div>
            }
        </div>
    )
}

export default HistoryList;