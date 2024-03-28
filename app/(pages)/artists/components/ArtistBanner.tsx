'use client'
import { ArtistInterface, ISong } from "@/app/api/models";
import { motion } from "framer-motion";
import AddFavouriteArtist from "./AddFavoriteArtist";
import { useAppDispatch } from "@/app-state/app-hooks";
import { playCustom } from "@/app-state/app-state";
import SignInBtnBasicFilled from "@/components/signIn/SignInBtnBasicFilled";

export const Animation={
    initial:{ opacity: 0, y: -50 }, // Initial animation state
    animate:{ opacity: 1, y: 0 },    // Animation to run
    transition:{ duration: 0.6 },  
 }


function ArtistBanner({data,songs}:{data:ArtistInterface,songs:ISong[]}) {
    const dispatch=useAppDispatch()
    return ( 
        <div className="rounded-xl p-6 px-8 bg-red-200 flex gap-4 flex-col sm:flex-row-reverse justify-between">
            <motion.div {...Animation} style={{backgroundImage:`url(${data.image})`}} className="rounded-2xl shadow-lg shrink-0 h-[13rem] w-[13rem] !bg-cover bg-center">

            </motion.div>
            <motion.div className="flex flex-col gap-6" {...Animation}>
            <div>
            <h2 className="font-bold text-slate-500 text-lg ">{data.genre.join(" - ")}</h2>
            <h1 className="font-bold text-5xl sm:text-7xl">{data.name}</h1>
            </div>
            <div className="flex gap-4 items-center">
            <SignInBtnBasicFilled handleClick={()=>dispatch(playCustom({songs:songs,index:0,_id:songs[0]._id}))}>Listen now</SignInBtnBasicFilled>
            <AddFavouriteArtist artist={data}/>
            </div>
            </motion.div>
        </div>
     );
}

export default ArtistBanner;