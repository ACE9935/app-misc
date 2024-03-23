"use client"
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import { Box, Skeleton } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import ArtistsGroup from "@/components/ArtistsGroup";
import Link from "next/link";

const fetchArtists = async (limit: number) => {
  try {
    const apiUrl = `/get-top-artists/api?limit=${limit}`;
    const response = await fetch(`/get-top-artists/api?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const artists = await response.json();
    return artists.data;
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in fetchArtists:', error);
    throw new Error('Failed to fetch top artists');
  }
};

function ArtistsTab() {  
     
       const {
         data,
         isLoading
       } = useQuery({
        queryKey: ["top-artists"],
        queryFn:()=>fetchArtists(7)
      })

    return ( 
      <>
      {isLoading?
       <div
       className="flex gap-4 p-3 overflow-hidden"
     >
      {
        Array.from({ length: 8 }, (_, index) => (
      <Box className='!w-max !flex !flex-col !items-center' key={index}>
        <Skeleton width='7rem' height="7rem" variant='circular'/>
        <Skeleton width="70%" />
      </Box>
    ))}
     </div>
        :
      <div>
      <div className='p-3 flex justify-between'><h1 className='text-2xl font-bold'>Top Artists</h1>
      <div className='flex gap-2'>
          <Link href='/artists'><SignInBtnBasic>See more</SignInBtnBasic></Link>
      </div>
      </div>
     <ArtistsGroup data={data}/>
    </div>
     }
     </>
     );
}

export default ArtistsTab;