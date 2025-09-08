import React from "react";
import { doctorAgent } from "./DoctorsAgentCard";
import Image from "next/image";

type props = {
    doctorAgent:doctorAgent
    setSelectedDoctor: any;
    selectedDoctor: doctorAgent
}
function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: props) {
    return (
        <div className = {`flex flex-col items-center p-4 border rounded-lg shadow-md justify-between gap-2 hover:scale-[1.03] transition-all cursor-pointer hover:border-blue-500 ${selectedDoctor?.id == doctorAgent?.id && 'border-blue-500'}`}
        onClick = {() => setSelectedDoctor(doctorAgent)}>
            <Image src={doctorAgent?.image} alt={doctorAgent?.specialist} width={70} height={70} className='w-[50px] h-[50px] rounded-4xl object-cover' />
            <h2 className ='font-bold text-sm text-center'>{doctorAgent?.specialist}</h2>
            <p className ='text-xs text-center'>{doctorAgent?.description}</p>
        </div>
    );
}
export default SuggestedDoctorCard;