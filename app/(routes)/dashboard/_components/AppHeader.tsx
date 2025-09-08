"use client";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import React from "react";

const menuOptions = [
    {
        id:1,
        name:'Home',
        path:'/dashboard'
    },
    {
        id:2,
        name:'History',
        path:'/dashboard/history'
    },
    {
        id:3,
        name:'Pricing',
        path:'/dashboard/billing'
    }
]

function AppHeader(){
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    return(
        <div className = 'flex justify-between items-center p-4 shadow px-10 md:px-15 lg:px-20'>
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">⛨ MediVox</div>
            <div className = 'hidden md:flex gap-12 items-center'>
                {menuOptions.map((option,index)=>(
                    <div key={index}>
                        <a href={option.path} className='hover:font-bold cursor-pointer transition-all'>{option.name}</a>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <UserButton />
                {mounted && <ThemeToggle />}
            </div>
        </div>
    )
}

export default AppHeader;