"use client"
import { signOut, useSession } from 'next-auth/react';
import SignInTab from "@/components/signIn/SignInTab";
import { redirect } from 'next/navigation';

function SigninPage() {
  const {data,status}=useSession()
  if(data?.user) redirect('/')
    return (
        <>
        <div className="p-3 w-full max-w-[40rem] mix-blend-normal relative z-10">
        <>{status=="loading"?<></>:<SignInTab page/>}</>
    </div>
        <div className="absolute w-full h-full grid place-items-center bg-main mix-blend-multiply">
        </div>
        </> 
     );
}

export default SigninPage;