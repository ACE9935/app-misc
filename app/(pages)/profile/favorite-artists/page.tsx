"use client"
import { ArtistInterface } from "@/app/api/models";
import { Genre } from "@/app/types/main-genres";
import { useSession } from 'next-auth/react';
import ArtistsTabForPage from "@/app/(pages)/artists/components/ArtistsTabForPage";
import MiscLoader from "@/components/MiscLoader";

export type ArtistsTab= {genre:Genre,artists:ArtistInterface[]}

const limit=20

 function ArtistPersonalPage({
    params,
    searchParams,
  }: {
    params: { genre: string }
    searchParams: { [page: string]: string | string[] | undefined }
  }) {
    const {data,status}=useSession()
    const artistsFav=data?.user.infos.info?.favoriteArtists
 
    if(!data) return <MiscLoader/>
  return (
    <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-5 py-5'><ArtistsTabForPage navigate={false} genre="Favorite artists" artists={artistsFav!}/></div>
      {artistsFav?.length!>limit&&<div className="flex justify-center py-4">
        </div>
        }
   </main>
  )
}

export default ArtistPersonalPage;