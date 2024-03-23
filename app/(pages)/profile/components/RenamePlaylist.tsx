"use client"
import * as React from 'react';
import {IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useAppDispatch } from '@/app-state/app-hooks';
import { openEditTab } from '@/app-state/rename-playlist-model';

export default function RenamePlaylist({id,name}:{id:string,name?:string}) {
  const dispatch=useAppDispatch()
  return (
    <>
    <Tooltip title='Edit playlist'>
    <IconButton
    onClick={()=>dispatch(openEditTab({id:id,name:name}))}
    size="large">
            <Edit/>
            </IconButton>
    </Tooltip>
    </>
  );
}