"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TopSongcard from './TopSongCard';
import { ISong } from '@/app/api/models';
import { Box, IconButton, Skeleton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { SwiperClass } from 'swiper/react';

const fetchTopSongs = async (limit = 25) => {
  try {
    const apiUrl = `/get-top-songs/api?limit=${limit}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const songs = await response.json();
    return songs.data;
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in fetchTopSongs:', error);
    throw new Error('Failed to fetch top songs');
  }
};


function TopSongs() {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
     
       const {
         data,
         isLoading
       } = useQuery({
        queryKey: ["top-songs"],
        queryFn: ()=>fetchTopSongs(25)
      })

  return (
    <>
    {isLoading?<div className='flex gap-4 p-3 overflow-hidden'>{
        Array.from({ length: 8 }, (_, index) => (
      <Box className='!w-max' key={index}>
        <Skeleton width='16rem' height="16rem" variant='rectangular'/>
        <Skeleton width="60%" />
        <Skeleton width="30%" />
      </Box>
    ))
        }
    </div>:
    <div>
    <div className='p-3 flex justify-between'><h1 className='text-2xl font-bold'>Top Music</h1>
    <div className='flex gap-2'>
        <IconButton onClick={()=>swiperRef?.slidePrev()}><ArrowBack/></IconButton>
        <IconButton onClick={()=>swiperRef?.slideNext()}><ArrowForward/></IconButton>
    </div>
    </div>
    <Swiper
    onSwiper={setSwiperRef}
    slidesPerView='auto'
    className='overflow-hidden min-w-0 max-w-screen'
  >
   {data?.map((o:ISong,i:number)=><SwiperSlide className='!p-3 !w-fit !h-fit' key={i}><TopSongcard {...o}/></SwiperSlide>)}
  </Swiper>
  </div>
    }
      
      </>
  );
}

export default TopSongs
