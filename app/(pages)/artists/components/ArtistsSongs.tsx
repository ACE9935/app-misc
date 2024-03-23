"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import SongPlayerBasic from "@/components/hero/SongsAndArtists/SongPLayerBasic";
import { ISong } from '@/app/api/models';
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import Loader from "@/components/Loader";
import SongsSkeleton from "./SongsSkeleton";

const fetchSongs = async ({ pageParam=1,artist }: any) => {
 
  try {
    const apiUrl = `/get-artists-songs/api?page=${pageParam}&artist=${encodeURIComponent(artist)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const songs = await response.json();
    return songs;
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in fetchPopularSongs:', error);
    throw new Error('Failed to fetch popular songs');
  }
};


function ArtistsSongs({artist}:{artist:string}) {
 
   const {
     data,
     isLoading,
     isPending,
     fetchNextPage,
     hasNextPage,
     isFetchingNextPage,
   } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey:["songs-for-artist"+artist],
    queryFn: ({pageParam=1})=>fetchSongs({pageParam,artist}),
    getNextPageParam: (_lastPage, pages) =>{
      if(pages.length==_lastPage.pageLength) return undefined
      return pages.length+1
     }
  })


    if(!isLoading) return (
      <>{data&&
        <div className="pt-4">
      <div className="flex flex-col gap-6 py-6">
           {data?data?.pages?.map((o,i)=>
           o.data.map((o:ISong,j:number) => (
            <div key={i+j}>
            <SongPlayerBasic albumPlay songIndex={i*5+j} songObject={o}/>
            </div>
          ))
           ):<></>}
           {isFetchingNextPage?<Loader/>:hasNextPage&&<SignInBtnBasic handleClick={()=>fetchNextPage()}>Show more</SignInBtnBasic>}
    </div>
    </div>
}</> 
     );

     if(isLoading) return <SongsSkeleton/>
     
}

export default ArtistsSongs;