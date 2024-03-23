import { useAppSelector } from "@/app-state/app-hooks";
import { ISong } from "@/app/api/models";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import MiscToast from "../MiscToast";
import { useToast } from "@chakra-ui/react";
import { DoneOutline } from "@mui/icons-material";

const addSongToPlaylist = async ({ userId, song, playlistId, action, update }: { userId: string; song: ISong; playlistId: string; action: string; update: any }) => {
  try {
    const apiUrl = '/add-to-playlist/api';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers like Authorization if needed
      },
      body: JSON.stringify({ id: playlistId, userId, song, action }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Call update only if the request was successful
    await update();

    return response.json();
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in addSongToPlaylist:', error);
    throw new Error('Failed to add song to playlist');
  }
};

function AddToNamedPlaylist({playlist:o}:{playlist:{_id:string,name:string,songs:ISong[]}}) {

    const {data,status,update}=useSession()
    const toast = useToast()
    const model=useAppSelector(state=>state.addPlaylist)
    const [checkx,setCheckx]=useState((o.songs.some(obj=>obj?.title==model?.song?.title)))
    const { mutate,status:ss } = useMutation({mutationFn:addSongToPlaylist,onSuccess(data, variables, context) {
        variables.action=="add"?
        toast({
            position:'bottom-left',
            render:()=>(<MiscToast title='Title added successfully' Icon={DoneOutline}/>),
            duration: 2000,
          }):
          toast({
            position:'bottom-left',
            render:()=>(<MiscToast title='Title removed successfully' Icon={DoneOutline}/>),
            duration: 2000,
          })
    },})
    
    const handleClick = async () => {
        setCheckx(o=>!o)
        if((o.songs.some(obj=>obj?.title==model?.song?.title)))mutate({userId:data?.user?.infos._id,song:model.song!,playlistId:o._id,action:"remove",update:update})
        else mutate({userId:data?.user?.infos._id,song:model.song!,playlistId:o._id,action:"add",update:update})
      }

    return ( 
        <>
        {ss=="pending"&&<img width={30} height={30} src='/loading.gif'/>}
        <FormControlLabel
        className="!px-3"
        disabled={ss=="pending"}
        checked={checkx||false}
        onClick={handleClick}
        label={<p className="max-w-[7rem] over">{o.name}</p>}
       control={
       <Checkbox
       
        />}
        />
        </>
     );
}

export default AddToNamedPlaylist;

