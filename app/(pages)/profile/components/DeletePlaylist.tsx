"use client"
import * as React from 'react';
import {IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppDispatch } from '@/app-state/app-hooks';
import { openDeleteTab } from '@/app-state/delete-playlist-model';

export default function DeletePlaylist({id}:{id:string}) {
  const dispatch=useAppDispatch()
  return (
    <>
    <Tooltip title='Delete playlist'>
    <IconButton
    onClick={()=>dispatch(openDeleteTab(id))}
    size="large">
                <Delete/>
            </IconButton>
    </Tooltip>
    </>
  );
}