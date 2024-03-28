'use client'
import {ISong, ISongPlaylist } from "@/app/api/models";
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/app-state/app-hooks";
import { nextSongBasedOnPlaylist, playCustom } from "@/app-state/app-state";
import SignInBtnBasicFilled from "@/components/signIn/SignInBtnBasicFilled";

const Animation={
    initial:{ opacity: 0, y: -50 }, // Initial animation state
    animate:{ opacity: 1, y: 0 },    // Animation to run
    transition:{ duration: 0.6 },  
 }


function PlaylistBanner({data,songs}:{data:ISongPlaylist,songs:ISong[]}) {
    const dispatch=useAppDispatch()
    return ( 
        <div className="rounded-xl p-6 px-8 bg-red-200 flex gap-4 flex-col sm:flex-row-reverse justify-between items-start">
            <motion.img {...Animation} src={data.image} className="shrink-0 w-[20rem]"/>
            <motion.div className="flex flex-col gap-6" {...Animation}>
            <div>
            <h2 className="font-bold text-slate-500 text-lg ">{data.genres.join(" - ")}</h2>
            <h1 className="font-bold text-5xl sm:text-7xl">{data.name}</h1>
            </div>
            <div className="flex gap-4 items-center">
            <SignInBtnBasicFilled handleClick={()=>dispatch(playCustom({songs:songs,index:0,_id:songs[0]._id}))}>Listen now</SignInBtnBasicFilled>
            </div>
            </motion.div>
        </div>
     );
}

export default PlaylistBanner;