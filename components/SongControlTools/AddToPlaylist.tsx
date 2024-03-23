import { PlaylistAdd } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/app-state/app-hooks';
import { open } from '@/app-state/model-state';
import { open as openP, setSong } from '@/app-state/playlist-model';
import * as React from 'react';
import { useToast } from '@chakra-ui/react';
import { ISong } from '@/app/api/models';

export default function AddToPlaylist({song}:{song:ISong}) {
  const {data,status}=useSession()
  const dispatch=useAppDispatch()
  const toast=useToast()

  const handleClick=()=>{
    dispatch(openP())
    dispatch(setSong(song))
  }

  return (
    <Tooltip title='Add to playlist'>
    <IconButton
    onClick={async function(e){
      e.stopPropagation()
      if(status=="unauthenticated" || !data){
        dispatch(open())
      }else if(status=="authenticated") handleClick()
    }}
    aria-label="add-song">
      <PlaylistAdd/>
    </IconButton>
    </Tooltip>
  );
}