import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorsAgentCard from "./DoctorsAgentCard";
function DoctorsAgentList(){
    return(
        <div className = 'mt-10'>
            <h2 className ='font-bold text-xl'>AI Specialist Doctor Agent</h2>

            <div className ='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5'>
                {AIDoctorAgents.map((doctor, index) => (
                    <div key={index}>
                        <DoctorsAgentCard doctorAgent={doctor} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsAgentList;