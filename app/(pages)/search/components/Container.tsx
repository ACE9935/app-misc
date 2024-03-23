"use client"
import { ArtistInterface, ISong, ISongPlaylist} from "@/app/api/models";
import ArtistsGroup from "@/components/ArtistsGroup";
import MiscTitle from "@/components/MiscTitle";
import SongPlayerBasic from "@/components/hero/SongsAndArtists/SongPLayerBasic";
import Playlist from "../../playlists/components/Playlist";
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import Link from "next/link";

export default function SearchContainer({data}:{data:{artists:ArtistInterface[],songs:ISong[],playlists:ISongPlaylist[]}[]}) {
    const check=!data[0].artists.length&&!data[0].songs.length&&!data[0].playlists.length
  return (
    <main className='min-w-0 p-3'>
        {!check?<div className="flex flex-col gap-6">
        {data[0].artists.length?<div className="flex flex-col gap-2"> 
                <MiscTitle>Artists</MiscTitle>
                <ArtistsGroup data={data[0].artists}/>
            </div>:<></>}
            {data[0].songs.length?<div className="flex flex-col gap-2">
        <MiscTitle>Titles</MiscTitle>
            {data[0].songs.map((o:ISong,i:number)=><SongPlayerBasic key={i} songObject={o}/>)}
        </div>:<></>}
        {data[0].playlists.length?<div className="flex flex-col gap-4">
        <MiscTitle>Playlists</MiscTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data[0].playlists.map((o:ISongPlaylist,i:number)=><div className="cursor-pointer" key={i}>
            <Playlist songObject={o} play/>
            <h2 className="text-xl font-semibold">{o.name}</h2>
            </div>)}
        </div>
     </div>:<></>}
    </div>
:<div className="flex flex-col gap-4">
    <MiscTitle>No results found</MiscTitle>
    <Link href='/'><SignInBtnBasic>Go back home</SignInBtnBasic></Link>
    </div>}</main>
  )
}
