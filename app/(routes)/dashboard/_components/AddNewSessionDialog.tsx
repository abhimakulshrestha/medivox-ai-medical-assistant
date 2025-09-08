"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorsAgentCard, { doctorAgent } from "./DoctorsAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

function AddNewSessionDialog() {
    const [note,setNote] = useState<string>();
    const [loading,setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent >();
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[] | null>(null);
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
    const router = useRouter();

    const {has} = useAuth();
      //@ts-ignore
      const paidUser =has && has({ plan: 'pro' })
          useEffect(() => {
          GetHistoryList();
}, []);

    const GetHistoryList = async() => {
        const result  = await axios.get('/api/session-chat?sessionId=all');
        console.log(result.data);
        setHistoryList(result.data);   
    }

    const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors',{
      notes:note
    });
    console.log(result.data);
    // Ensure result.data is always an array
    if (Array.isArray(result.data)) {
      setSuggestedDoctors(result.data);
    } else if (result.data && Array.isArray(result.data.doctors)) {
      setSuggestedDoctors(result.data.doctors);
    } else if (result.data) {
      setSuggestedDoctors([result.data]);
    } else {
      setSuggestedDoctors([]);
    }
    setLoading(false);
  }
  const onStartConsultation = async() => {
    setLoading(true);
    const result = await axios.post('/api/session-chat',{
      notes:note,
      selectedDoctor:selectedDoctor
    });

    console.log(result.data);
    if(result.data?.sessionId){
      console.log(result.data.sessionId);
      router.push('/dashboard/medical-agent/'+result.data.sessionId);

    }
    setLoading(false);
  }




    return (
        <Dialog>
  <DialogTrigger asChild>
    <Button className='mt-3' disabled = {!paidUser&&historyList?.length>=10}>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        {!suggestedDoctors? <div>
        <h2>Please provide the Symptoms or any other necessary details to start your consultation.</h2>
        <Textarea className="mt-1 h-[200px]" placeholder="Describe your symptoms here..." 
        onChange = {(e) => setNote(e.target.value)}/>
        </div>:
        <div>
          <h2 className="mb-4">Based on your symptoms, we suggest the following doctors:</h2>
        <div className ='grid grid-cols-3 gap-4'>
          {/* // Suggested Doctors */}
          {(Array.isArray(suggestedDoctors) ? suggestedDoctors : []).map((doctor, index)=>(
            <SuggestedDoctorCard doctorAgent={doctor} key={index}
            setSelectedDoctor={() => setSelectedDoctor(doctor)} 
            //@ts-ignore
            selectedDoctor = {selectedDoctor}/>
          ))}
        </div>
        </div>}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
    <DialogClose asChild>
      <Button variant = {'outline'}>Cancel</Button>
    </DialogClose>

{!suggestedDoctors? <Button disabled ={!note || loading} onClick = {() => OnClickNext()}>
          Next {loading?<Loader2 className ='animate-spin mr-2' />:<ArrowRight />}</Button>:
          <Button disabled ={loading || !selectedDoctor} onClick = {() => onStartConsultation()}>Start Consultation {loading?<Loader2 className ='animate-spin mr-2' />:<ArrowRight />}</Button>}

    </DialogFooter>
  </DialogContent>
</Dialog>
    );
}

export default AddNewSessionDialog;