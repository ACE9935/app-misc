
import { ISongPlaylist } from "@/app/api/models";
import SignInBtnBasic from "../signIn/SignInBtnBasic";
import Link from "next/link";

function PlaylistCard({songObject,play}:{songObject:ISongPlaylist,play?:boolean}) {

    return ( 
        <div className="bg-red-200 shadow-lg relative w-full h-full lg:aspect-video rounded-2xl p-4 gap-6 lg:gap-0 flex flex-col lg:flex-row-reverse items-center">
            <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-bold">{songObject.name}</h2>
          <p className="text-lg xl:text-xl">{songObject.description}</p>
          <Link href={`/playlists/${encodeURIComponent(songObject.name!)}`}><SignInBtnBasic style={{width:'fit-content'}} handleClick={()=>0}>See more</SignInBtnBasic></Link>
          </div>
          <img className="w-[30rem]" src={songObject.image}/>
        </div>
     );
}

export default PlaylistCard;