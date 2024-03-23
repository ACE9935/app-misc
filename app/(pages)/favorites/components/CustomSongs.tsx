"use client"
import { ISong } from "@/app/api/models";
import SongPlayerBasic from "@/components/hero/SongsAndArtists/SongPLayerBasic";
import { useSession } from 'next-auth/react';
import SongsSkeleton from "@/app/(pages)/artists/components/SongsSkeleton";

function CustomSongs({id}:{id:string}) {
    const {data,status}=useSession()

    if(!data) return <SongsSkeleton/>
    return ( 
        <div className="flex flex-col gap-6 pt-6">
     {data?.user.infos.info?.playlists.find(o=>o._id==id)?.songs.map((o:ISong,i:number)=>
     
      <SongPlayerBasic key={i} songIndex={i} songObject={o} customPlaylist={data?.user.infos.info?.playlists.find(o=>o._id==id)?.songs}/>
     )}
     </div>
     );
}

export default CustomSongs;