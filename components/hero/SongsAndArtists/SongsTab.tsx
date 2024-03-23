"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import SongPlayerBasic from './SongPLayerBasic';
import { ISong } from '@/app/api/models';
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Loader";
import SongsSkeleton from "@/app/(pages)/artists/components/SongsSkeleton";

const fetchPopularSongs = async ({ pageParam }: any) => {
  try {
    const apiUrl = `/get-popular-songs/api?page=${pageParam}`;
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


function SongsTab({sample,title}:{sample?:boolean,title?:string}) {
 
   const {
     data,
     isLoading,
     fetchNextPage,
     hasNextPage,
     isFetchingNextPage,
   } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey:["songs"],
    queryFn: fetchPopularSongs,
    getNextPageParam: (_lastPage, pages) =>{
      if(pages.length==_lastPage.pageLength) return undefined
      return pages.length+1
     }
  })
   const { ref, inView, entry } = useInView({
    onChange:(inView,entry)=>{if(inView){fetchNextPage()}},
    rootMargin:''
  });

  if(isLoading) return <SongsSkeleton/>
    return (
      <>{data&&
        <div className="pt-4 p-3">
            <h1 className='text-2xl font-bold'>{title||"Popular"}</h1>
      <div className="flex flex-col gap-6 py-6">
           {data?data?.pages?.map((o,i)=>
           o.data.map((o:ISong,i:number) => (
            <div key={i}>
            <SongPlayerBasic songObject={o}/>
            </div>
          ))
           ):<></>}
           {!sample&&hasNextPage&&<div ref={ref}><Loader /></div>}
    </div>
    </div>
}</> 
     );
}

export default SongsTab;