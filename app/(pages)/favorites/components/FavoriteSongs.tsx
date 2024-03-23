"use client"
import { ISong } from "@/app/api/models";
import SongPlayerBasic from "@/components/hero/SongsAndArtists/SongPLayerBasic";
import { useSession } from 'next-auth/react';
import SongsSkeleton from "@/app/(pages)/artists/components/SongsSkeleton";

function FavoriteSongs() {
    const {data,status}=useSession()

    if(!data) return <SongsSkeleton/>
    return ( 
        <div className="flex flex-col gap-6 pt-6">
     {data?.user.infos.info?.favorites.map((o:ISong,i:number)=>
     
      <SongPlayerBasic key={i} songIndex={i} songObject={o} customPlaylist={data?.user.infos.info?.favorites}/>
     )}
     </div>
     );
}

export default FavoriteSongs;