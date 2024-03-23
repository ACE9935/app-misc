"use client"
import * as React from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/app-state/app-hooks';
import { open } from '@/app-state/model-state';
import { useMutation } from '@tanstack/react-query';
import { ArtistInterface} from '@/app/api/models';
import { useToast } from '@chakra-ui/react'
import MiscToast from '@/components/MiscToast';
import { HeartBroken } from '@mui/icons-material';
import { useState } from 'react';
import Loader from '@/components/Loader';

const addFavoriteArtist = async ({ userId, artist, action,update }: { userId: string; artist: ArtistInterface; action: string,update:any }) => {
  try {
    const apiUrl = '/add-favorites-artists/api';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers like Authorization if needed
      },
      body: JSON.stringify({ userId, artist, action }),
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


export default function AddFavouriteArtist({artist}:{artist:ArtistInterface}) {
  const {data:tmpData,status,update}=useSession()
  const [data,setData]=useState(tmpData)
  const dispatch=useAppDispatch()
  const toast = useToast()
  const { mutate,isPending } = useMutation({mutationFn:addFavoriteArtist});

  React.useEffect(()=>{
   setData(tmpData)
  },[tmpData])

  const handleClick = async () => {
    if(data?.user?.infos?.info?.favoriteArtists.some((obj:ArtistInterface) => obj.name == artist.name)){
      toast({
        position:'bottom-left',
        render:()=>(<MiscToast title='Artist removed from favorites' Icon={HeartBroken}/>),
        duration: 2000,
      })
      mutate({userId:data?.user?.infos._id,artist:artist,action:"remove",update})
    }else {
      toast({
        position:'bottom-left',
        render:()=>(<MiscToast title='Artist added to favorites' Icon={FavoriteIcon}/>),
        duration: 2000,
      })
      mutate({userId:data?.user?.infos._id,artist:artist,action:"add",update})
    }
  }

  return (
    <>{!isPending?
    <Tooltip title='Add to your favorites'>
    <Checkbox
    size='large'
      checked={(data?.user?.infos?.info?.favoriteArtists.some((obj:ArtistInterface) => obj.name == artist.name))||false}
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