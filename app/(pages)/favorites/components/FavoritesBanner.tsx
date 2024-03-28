"use client"
import { useAppDispatch } from "@/app-state/app-hooks";
import { Animation } from "@/app/(pages)/artists/components/ArtistBanner";
import {motion} from "framer-motion"
import { useSession } from 'next-auth/react';
import { playCustom } from "@/app-state/app-state";
import Link from "next/link";
import SignInBtnBasicFilled from "@/components/signIn/SignInBtnBasicFilled";


function FavoritesBanner({lengthOfSongs}:{lengthOfSongs?:number}) {
    const {data}=useSession()
    const dispatch=useAppDispatch()
    const lengthx=data?.user.infos.info?.favorites.length
    return ( 
        <div className="rounded-xl p-6 px-8 bg-red-200 flex gap-4 flex-col sm:flex-row-reverse justify-between">
            <motion.div {...Animation} style={{backgroundImage:'url("/favorite.png")'}} className="shrink-0 h-[10rem] w-[10rem] !bg-contain bg-center bg-amber-200 rounded-2xl shadow-xl"></motion.div>
            <motion.div className="flex flex-col gap-6" {...Animation}>
            <div>
            <h2 className="font-semibold text-slate-700 text-lg ">Playlist</h2>
            <h1 className="font-bold text-5xl sm:text-7xl">Favorite Titles</h1>
            {data&&<h4 className="font-bold text-lg pt-3">{`${lengthx} titles`}</h4>}
            </div>
            <div className="flex gap-4 items-center">
            {lengthx?<SignInBtnBasicFilled handleClick={()=>dispatch(playCustom({songs:data?.user.infos.info?.favorites,_id:data?.user.infos.info?.favorites[0]._id}))}>Listen now</SignInBtnBasicFilled>:<Link href="/"><SignInBtnBasicFilled handleClick={()=>0}>Go back home</SignInBtnBasicFilled></Link>}
            </div>
            </motion.div>
        </div>
     );
}

export default FavoritesBanner;