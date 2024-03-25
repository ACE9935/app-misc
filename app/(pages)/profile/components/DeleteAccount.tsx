"use client"
import * as React from 'react';
import { useAppDispatch } from '@/app-state/app-hooks';
import SignInBtnBasic from '@/components/signIn/SignInBtnBasic';
import { useSession } from 'next-auth/react';
import { openDeleteUserTab } from '@/app-state/delete-account';

export default function DeleteAccount() {
    const {data}=useSession()
    const dispatch=useAppDispatch()
  return (
   <SignInBtnBasic handleClick={()=>dispatch(openDeleteUserTab({id:data?.user.infos._id}))} style={{fontSize:"0.8rem",padding:"0.6rem"}}>Delete account</SignInBtnBasic>
  );
}