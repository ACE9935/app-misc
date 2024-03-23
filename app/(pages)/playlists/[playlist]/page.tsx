
import { ISongPlaylist } from "@/app/api/models";
import { notFound } from "next/navigation";
import PlaylistBanner from "../components/PlaylistBanner";
import PlaylistSongs from "../components/PlaylistSongs";
import RecommendedArtists from "../components/RecommendedArtists";

export const dynamic = "force-dynamic"

export async function generateMetadata(
  { params, searchParams }: {
    params: { playlist: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
 
  return {
    title: `Misc - ${decodeURIComponent(params.playlist)}`,
  }
}

async function getData(artist: string) {
  try {
    const response = await fetch(`${process.env.HOST}/get-single-playlist/api?name=${artist}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in addFavoriteSong:', error);
    throw new Error('Failed to add song to favorites');
  }
}

  

async function PlaylistPage({
    params,
    searchParams,
  }: {
    params: { playlist: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const data:ISongPlaylist[] = await getData(params.playlist)
    if(!data || !data.length) notFound()
    return ( 
        <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-4'>
        <PlaylistBanner data={data[0]}/>
        <PlaylistSongs genre={data[0].genres}/>
        <RecommendedArtists name={data[0].name!}/>
        </div>
   </main>
     );
}

export default PlaylistPage;