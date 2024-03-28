"use client"
import { useAppDispatch } from "@/app-state/app-hooks";
import { Animation } from "@/app/(pages)/artists/components/ArtistBanner";
import {motion} from "framer-motion"
import { playCustom } from "@/app-state/app-state";
import Link from "next/link";
import { userPlaylist } from "@/app/api/models";
import CustomPlaylists from "./CustomPlaylists";
import DeletePlaylist from "./DeletePlaylist";
import RenamePlaylist from "./RenamePlaylist";
import SignInBtnBasicFilled from "@/components/signIn/SignInBtnBasicFilled";

function CustomPlaylistBanner({playlist}:{playlist:userPlaylist}) {
   const dispatch=useAppDispatch()

    return ( 
        <div className="rounded-xl p-6 px-8 bg-red-200 flex gap-4 flex-col sm:flex-row-reverse justify-between">
            <motion.div {...Animation} className="shrink-0 w-[14rem]">
                <CustomPlaylists playlist={playlist} banner/>
            </motion.div>
            <motion.div className="flex flex-col gap-6" {...Animation}>
            <div>
            <h2 className="font-semibold text-slate-700 text-lg ">Playlist</h2>
            <h1 className="font-bold text-5xl sm:text-7xl break-all">{playlist.name}</h1>
            <h4 className="font-bold text-lg pt-3">{`${playlist.songs.length} titles`}</h4>
            </div>
            <div className="flex gap-1 items-center">
            <div className="pr-3">{playlist.songs.length?<SignInBtnBasicFilled handleClick={()=>dispatch(playCustom({songs:playlist.songs,_id:playlist.songs[0]._id}))}>Listen now</SignInBtnBasicFilled>:<Link href="/profile"><SignInBtnBasicFilled handleClick={()=>0}>Go to profile</SignInBtnBasicFilled></Link>}</div>
            <RenamePlaylist id={playlist._id} name={playlist.name!}/>
            <DeletePlaylist id={playlist._id}/>
            </div>
            </motion.div>
        </div>
     );
}

export default CustomPlaylistBanner;