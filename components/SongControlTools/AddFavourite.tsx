"use client"
import * as React from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/app-state/app-hooks';
import { open } from '@/app-state/model-state';
import { useMutation } from '@tanstack/react-query';
import { ISong} from '@/app/api/models';
import { useToast } from '@chakra-ui/react'
import MiscToast from '@/components/MiscToast';
import { HeartBroken } from '@mui/icons-material';
import { useState } from 'react';
import Loader from '@/components/Loader';

const addFavorites = async ({ userId, song, action,update }: { userId: string; song: ISong; action: string,update:any }) => {
  try {
    const apiUrl = '/add-favorites/api';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers like Authorization if needed
      },
      body: JSON.stringify({ userId, song, action }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    await update()

    return response.json();
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in addFavoriteSong:', error);
    throw new Error('Failed to add song to favorites');
  }
};


export default function AddFavourite({song}:{song:ISong}) {
  const {data:tmpData,status,update}=useSession()
  const [data,setData]=useState(tmpData)
  const dispatch=useAppDispatch()
  const toast = useToast()
  const { mutate,isPending } = useMutation({mutationFn:addFavorites});

  React.useEffect(()=>{
   setData(tmpData)
  },[tmpData])

  const handleClick = async () => {
    if(data?.user?.infos?.info?.favorites.some((obj:ISong) => obj.title == song.title)){
      toast({
        position:'bottom-left',
        render:()=>(<MiscToast title='Title removed from favorites' Icon={HeartBroken}/>),
        duration: 2000,
      })
      mutate({userId:data?.user?.infos._id,song:song,action:"remove",update})
    }else {
      toast({
        position:'bottom-left',
        render:()=>(<MiscToast title='Title added to favorites' Icon={FavoriteIcon}/>),
        duration: 2000,
      })
      mutate({userId:data?.user?.infos._id,song:song,action:"add",update})
    }
  }

  return (
    <>{!isPending?
    <Tooltip title='Add to your favorites'>
    <Checkbox
      checked={(data?.user?.infos?.info?.favorites.some((obj:ISong) => obj.title == song.title))||false}
      onClick={async function(e){
        e.stopPropagation()
        if(status=="unauthenticated" || !data){
          dispatch(open())
        }else if(status=="authenticated") handleClick()
      }}
      checkedIcon={<FavoriteIcon />}
      icon={<FavoriteBorderIcon />}
    />
    </Tooltip>:
    <div className='p-1'><Loader/></div>
    }</>
  );
}