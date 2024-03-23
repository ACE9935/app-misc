
import { ArtistInterface } from "@/app/api/models";
import { Genre } from "@/app/types/main-genres";
import { notFound} from "next/navigation";
import ArtistsTabForPage from "../../components/ArtistsTabForPage";
import ArtistsPagination from "../../components/ArtistsPagination";

export type ArtistsTab= {genre:Genre,artists:ArtistInterface[]}

const limit=20

export async function generateMetadata(
  { params, searchParams }: {
    params: { genre: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
 
  return {
    title: `Misc - ${params.genre}`,
  }
}

async function getData(genre: string,key:any) {
  try {
    const response = await fetch(`${process.env.HOST}/get-genres-artists/api?genre=${genre}&key=${key}`);

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

async function ArtistPersonalPage({
    params,
    searchParams,
  }: {
    params: { genre: string }
    searchParams: { [page: string]: string | string[] | undefined }
  }) {
    const data:any = await getData(params.genre,searchParams.page)
    if(!data || data?.artists.length==0) notFound()
  return (
    <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-5 py-5'><ArtistsTabForPage navigate={false} genre={data.genre} artists={data.artists}/></div>
      {data.numberofPagesOfGenre>limit&&<div className="flex justify-center py-4">
        <ArtistsPagination genre={params.genre} limit={limit} numberofPagesOfGenre={data.numberofPagesOfGenre}/>
        </div>
        }
   </main>
  )
}

export default ArtistPersonalPage;