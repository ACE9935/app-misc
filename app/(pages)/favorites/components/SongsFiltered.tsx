"use client";
import { useQuery } from "@tanstack/react-query";
import SongPlayerBasic from "@/components/hero/SongsAndArtists/SongPLayerBasic";
import { ISong } from '@/app/api/models';
import SongsSkeleton from "@/app/(pages)/artists/components/SongsSkeleton";
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";

const fetchPopularSongs = async ({ pageParam }: any) => {
  try {
    const apiUrl = `/get-sample-popular-songs/api`;
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


function SongsFiltered({songsTab,sample,title}:{sample?:boolean,title?:string,songsTab:ISong[]}) {
 
   const {
     data,
     isLoading,
     refetch,
   } = useQuery({
    queryKey:["similar-songs"],
    queryFn: fetchPopularSongs,
  })
  if(isLoading) return <SongsSkeleton/>

  const filteredArray = data?.data.filter((item1:ISong) => !songsTab.some((item2:ISong) => item2.title === item1.title));
    return (
      <>{data&&
        <div className="pt-4">
            <h1 className='text-2xl font-bold'>Songs you might like</h1>
      <div className="flex flex-col gap-6 py-6">
           {filteredArray.slice(0,5).map((o:ISong,i:number) => (
            <div key={i}>
            <SongPlayerBasic songObject={o}/>
            </div>
          ))}
    </div>
    <SignInBtnBasic handleClick={()=>refetch()}>Get new titles</SignInBtnBasic>
    </div>
}</> 
     );
}

export default SongsFiltered;