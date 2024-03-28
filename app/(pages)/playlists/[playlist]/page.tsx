
import { ISong, ISongPlaylist } from "@/app/api/models";
import { notFound } from "next/navigation";
import PlaylistBanner from "../components/PlaylistBanner";
import PlaylistSongs from "../components/PlaylistSongs";
import RecommendedArtists from "../components/RecommendedArtists";

export const revalidate = 0;
export const dynamic='force-dynamic'

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
    const res:ISongPlaylist[]=await response.json()
    const songs=await fetch(`${process.env.HOST}/get-all-playlists-songs/api`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers like Authorization if needed
      },
      body: JSON.stringify({ genres:res[0]?res[0].genres:null }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const songsx:ISong[]=await songs.json()
    return {playlist:res,songs:songsx};
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error:', error);
    throw new Error('Failed to fetch data');
  }
}

  

async function PlaylistPage({
    params,
    searchParams,
  }: {
    params: { playlist: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const data:any = await getData(params.playlist)
    if(!data || data.error || !data.playlist.length || !data.songs.length) notFound()
    return ( 
        <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-4'>
        <PlaylistBanner data={data.playlist[0]} songs={data.songs}/>
        <PlaylistSongs genre={data.playlist[0].genres} songs={data.songs}/>
        <RecommendedArtists name={data.playlist[0].name!}/>
        </div>
   </main>
     );
}

export default PlaylistPage;