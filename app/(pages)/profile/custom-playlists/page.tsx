"use client"
import { ArtistInterface } from "@/app/api/models";
import { Genre } from "@/app/types/main-genres";
import { useSession } from 'next-auth/react';
import MiscTitle from "@/components/MiscTitle";
import CustomPlaylists from "../components/CustomPlaylists";
import MiscLoader from "@/components/MiscLoader";

export type ArtistsTab= {genre:Genre,artists:ArtistInterface[]}

const limit=20

 function CustomPlaylistPage({
    params,
    searchParams,
  }: {
    params: {}
    searchParams: { [id: string]: string | string[] | undefined }
  }) {
    const {data,status}=useSession()
    const playlists=data?.user.infos.info?.playlists
 
  if(!data) return <MiscLoader/>
  return (
    <div className='flex flex-col gap-4 pt-6 p-3'>
        <div className='flex justify-between'>
            <MiscTitle>Your playlists</MiscTitle>
        </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {playlists?.map((o,i)=><CustomPlaylists play key={i} playlist={o}/>)}</div>
        </div>
  )
}

export default CustomPlaylistPage;