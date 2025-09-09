"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

export type UsersDetail = {
  email: string,
  name: string,
  credits: number
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const {user}  = useUser();
    const [userDetail,setUserDetail] = useState<any>();

    useEffect(() => {
        user&&CreateNewUser();
    },[user])


    const CreateNewUser = async() => {
        const result = await axios.post('/api/users');
        console.log(result.data);
        setUserDetail(result.data);
    }


    return(
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                {children}
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider;