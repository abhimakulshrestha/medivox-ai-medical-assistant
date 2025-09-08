"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type doctorAgent = {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
    assistantId: string;
    subscriptionRequired: boolean;
    voiceId?: string
}
type props = {
    doctorAgent:doctorAgent
}
function DoctorsAgentCard({doctorAgent}:props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const {has} = useAuth();
    //@ts-ignore
    const paidUser =has && has({ plan: 'pro' })
    console.log(paidUser);

    const onStartConsultation = async() => {
    setLoading(true);
    const result = await axios.post('/api/session-chat',{
      notes:'New Conversation',
      selectedDoctor:doctorAgent
    });

    console.log(result.data);
    if(result.data?.sessionId){
      console.log(result.data.sessionId);
      router.push('/dashboard/medical-agent/'+result.data.sessionId);

    }
    setLoading(false);
  }
    return (
        <div className = 'relative'>
            {doctorAgent.subscriptionRequired && <Badge className='absolute m-2 right-0'>
                Premium
            </Badge>}
            <Image src ={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} 
            className = 'w-full h-[250px] object-cover rounded-xl'/>
            <h2 className ='font-bold mt-1'>{doctorAgent.specialist}</h2>
            <p className = 'line-clamp-2 text-sm '>{doctorAgent.description}</p>
            <Button className = 'w-full mt-2' 
            onClick={onStartConsultation}
            disabled = {!paidUser&&doctorAgent.subscriptionRequired}>
                Start Consultation{loading?<Loader2Icon className="animate-spin"/>:<ArrowRight/>}</Button>
        </div>
    );
}

export default DoctorsAgentCard;
