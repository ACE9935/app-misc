"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ISongPlaylist } from '@/app/api/models';
import { Box, IconButton, Skeleton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { SwiperClass } from 'swiper/react';
import PlaylistCard from './PlaylistCard';
import {styled} from '@mui/material/styles';

const StyledSwiper=styled(Swiper)(({theme})=>({

   ".swiper-pagination":{
    position:"absolute !important",
    transform:'scale(1.35)',
    width:'fit-content',
    bottom:"10%",
    left:'7%'
   },
   ".swiper-pagination-bullet-active" :{
    background: "black"
   },
   '@media only screen and (max-width: 1024px)': {
    ".swiper-pagination": {
      // Your styles for screens wider than 1024 pixels
      display: 'none', // or any other styles you want
    }
  },
   }))

function PlaylistsCarousel() {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const fetchPlaylists = async () =>{
        const playlists= await fetch(`/get-playlists/api`)
        .then(data=>data.json())
        .catch(e=>{throw e})
    
        return playlists.data
      }
     
       const {
         data,
         isLoading
       } = useQuery({
        queryKey: ["playlists"],
        queryFn: ()=>fetchPlaylists()
      })

  return (
    <>
    {isLoading?
      <Box className="!p-3">
        <Skeleton width="100%" height="30rem" variant='rectangular'/>
      </Box>:
    <div>
    <div className='p-3 flex justify-between mt-1 xs:mt-3'><h1 className='text-2xl font-bold'>Our Playlists</h1>
    <div className='flex gap-2'>
        <IconButton onClick={()=>swiperRef?.slidePrev()}><ArrowBack/></IconButton>
        <IconButton onClick={()=>swiperRef?.slideNext()}><ArrowForward/></IconButton>
    </div>
    </div>
    <StyledSwiper
    autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
     pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
    onSwiper={setSwiperRef}
    className='overflow-hidden min-w-0 max-w-screen'
  >
   {data?.map((o:ISongPlaylist,i:number)=><SwiperSlide className='!w-fit lg:!h-fit !p-5' key={i}><PlaylistCard songObject={o}/></SwiperSlide>)}
  </StyledSwiper>
  </div>
    }
      
      </>
  );
}

export default PlaylistsCarousel