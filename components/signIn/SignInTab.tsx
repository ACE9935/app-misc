"use client"
import * as React from 'react';
import { Logo } from '../Logo';
import SignInBtn from './SignInBtn';
import { signIn } from "next-auth/react";
import { ArrowBack, CloseOutlined, Home } from '@mui/icons-material';
import { IconButton, Button } from '@mui/material';
import EmailForm from './EmailForm';
import { useAppDispatch, useAppSelector } from '@/app-state/app-hooks';
import { close, setForm, setMail, setVerify } from '@/app-state/model-state';
import { useRouter } from 'next/navigation';

function SignInTab({page}:{page?:boolean}) {
  const model=useAppSelector(state=>state.model)
  const dispatch=useAppDispatch()
  const router=useRouter()
    return ( 
        <>
        {!model.showForm?<div className='p-4 xs:p-6 pt-4 sm:px-20 bg-white w-full flex flex-col gap-12 pb-14'>
        <div className='flex justify-end sm:left-[50px] relative'>{!page?<IconButton onClick={()=>dispatch(close())}><CloseOutlined sx={{fontSize:30}}/></IconButton>:<IconButton onClick={()=>router.push('/')}><Home sx={{fontSize:30}}/></IconButton>}</div>
        <div className='flex flex-col gap-4 items-center'><h1 className='text-3xl sm:text-4xl flex items-center justify-center w-fit'><span>Sign in with</span><Logo className='text-xl sm:!text-2xl'/></h1>
        <p className='text-center text-lg'>Enhance your music journey! Sign in for exclusive features and personalized playlists. Unlock the full experience now!</p>
        </div>
        
        <div className='flex flex-col gap-3 pt-3'>
        <SignInBtn onClick={()=>signIn('google')} text="Sign in with Google" img="/google.png"/>
        <SignInBtn onClick={()=>dispatch(setForm(true))} text="Sign in with email" img="/email.png"/>
        </div>
      </div>
      :!model.verify?
      <div className='p-6 px-12 bg-white w-full flex items-center flex-col gap-12 pb-14'>
        <div className='flex relative w-full justify-between'>
        <IconButton onClick={()=>dispatch(setForm(false))}><ArrowBack sx={{fontSize:30}}/></IconButton>
          <IconButton onClick={()=>dispatch(close())}><CloseOutlined sx={{fontSize:30}}/></IconButton></div>
        <h1 className='text-4xl'>Sign in with email</h1>
        <p className='text-center text-lg sm:w-[80%]'>Enter the email address associated with your account, and we’ll send a magic link to your inbox.</p>
        <EmailForm setVerify={(x:boolean)=>dispatch(setVerify(x))} setEmail={(x:string)=>dispatch(setMail(x))}/>
      </div>:
      <div className='p-6 sm:px-14 bg-white w-full flex flex-col items-center gap-12 pb-14'>
        <div className='flex self-end relative sm:left-[30px]'><IconButton onClick={()=>dispatch(close())}><CloseOutlined sx={{fontSize:30}}/></IconButton></div>
      <h1 className='text-center text-2xl'>Check your inbox.</h1>
      <p className='text-center sm:w-[80%]'>
       Click the link we sent to {model.email} to complete your account set-up.
      </p>
      <Button onClick={()=>{
       dispatch(close())
      }} type='submit' className='!bg-main !text-white !mt-4 !rounded-full !p-3 !px-8 shadow-md w-fit'>OK</Button>
      </div>
      }</>
     );
}

export default SignInTab;