"use client"
import * as React from 'react';
import {IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useAppDispatch } from '@/app-state/app-hooks';
import { openEditUserNameTab } from '@/app-state/edit-user-name';

export default function RenameUser() {
  const dispatch=useAppDispatch()
  return (
    <>
    <Tooltip title='Edit user-name'>
    <IconButton
    onClick={()=>dispatch(openEditUserNameTab())}
    size="large">
            <Edit/>
            </IconButton>
    </Tooltip>
    </>
  );
}