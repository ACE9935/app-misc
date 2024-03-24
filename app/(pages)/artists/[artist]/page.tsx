
import { notFound } from "next/navigation";
import ArtistBanner from "../components/ArtistBanner";
import ArtistDescription from "../components/ArtistDescription";
import ArtistsSongs from "../components/ArtistsSongs";
import RecommendedPlaylists from "../components/RecommendedPlaylists";
import SimilarArtists from "../components/SimilarArtists";

export const revalidate = 0;
export const dynamic='force-dynamic'

async function getData(artist: string) {
  try {
    const response = await fetch(`${process.env.HOST}/get-data-x/api?name=${artist}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in artistPage:', error);
    throw new Error('Failed to fetch data');
  }
}


  export async function generateMetadata(
    { params, searchParams }: {
      params: { artist: string }
      searchParams: { [key: string]: string | string[] | undefined }
    }
  ) {
   
    return {
      title: `Misc - ${decodeURIComponent(params.artist)}`,
    }
  }

async function ArtistPersonalPage({
    params,
    searchParams,
  }: {
    params: { artist: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const data:any = await getData(params.artist)
    if(!data || data.error || !data?.data[0].artist) notFound()
    return ( 
      <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-4'>
        <ArtistBanner data={data.data[0].artist}/>
        <ArtistsSongs artist={params.artist}/>
        <SimilarArtists artist={params.artist}/>
        <RecommendedPlaylists playlists={data.data[0].playlists}/>
        <ArtistDescription>{data.data[0].artist.description}</ArtistDescription>
        </div>
   </main>
     );
}

export default ArtistPersonalPage;