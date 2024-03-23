"use client"

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from '@/app-state/app-hooks';
import { close } from '@/app-state/model-state';
import SignInTab from './SignInTab';

export default function SignInDialog({open:openx}:{open?:boolean}) {
  const model=useAppSelector(state=>state.model)
  const dispatch=useAppDispatch()

  return (
    <Dialog onClose={()=>dispatch(close())} open={openx || model.open}>
      <div className="flex flex-col gap-4">
      <SignInTab/>
      </div>
    </Dialog>
  );
}
