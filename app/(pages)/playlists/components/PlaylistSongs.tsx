"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import SongPlayerBasic from "@/components/hero/SongsAndArtists/SongPLayerBasic";
import { ISong } from '@/app/api/models';
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import Loader from "@/components/Loader";
import SongsSkeleton from "../../artists/components/SongsSkeleton";

const fetchSongs = async ({ pageParam=1,genre }: any) => {
 
  try {
    const apiUrl = `/get-playlist-songs/api?page=${pageParam}`;
    const response = await fetch(apiUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers like Authorization if needed
        },
        body: JSON.stringify({ genres:genre }),
      });

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


function PlaylistSongs({genre,songs}:{genre:string[],songs:ISong[]}) {
 
   const {
     data,
     isLoading,
     isPending,
     fetchNextPage,
     hasNextPage,
     isFetchingNextPage,
   } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey:["songs-for-playlist-"+genre[0]],
    queryFn: ({pageParam=1})=>fetchSongs({pageParam,genre}),
    getNextPageParam: (_lastPage, pages) =>{
      if(pages.length==_lastPage.pageLength) return undefined
      return pages.length+1
     }
  })


    if(!isLoading) return (
      <>{data&&
        <div className="pt-4">
      <div className="flex flex-col gap-6 py-6">
           {data?data?.pages?.map((o,i:number)=>
           o.data.map((o:ISong,j:number) => (
            <div key={i+j}>
            <SongPlayerBasic key={i*5+j} songIndex={i*5+j} songObject={o} customPlaylist={songs}/>
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

export default PlaylistSongs;