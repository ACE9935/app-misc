"use client"
import { ISong, userPlaylist } from "@/app/api/models";
import MiscPlayButton from "@/components/MiscPlayButton";
import { AnimatePresence,motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CustomPlaylists({playlist,banner,play}:{playlist:userPlaylist,banner?:boolean,play?:boolean}) {
    const router=useRouter()
    const [checked,setChecked]=useState(false)

    return ( 
        <div
        onMouseEnter={()=>setChecked(true)}
        onMouseLeave={()=>setChecked(false)}
        onClick={()=>router.push(`/profile/custom-playlists/${encodeURIComponent(playlist._id)}`)} className="flex flex-col gap-1 cursor-pointer">
        <div className="w-full relative overflow-hidden rounded-2xl shadow-2xl aspect-square grid grid-cols-2 grid-rows-2 bg-main/60 bg-blend-multiply bg-[url('/background-sn1.jpg')]">
            {playlist.songs.slice(0,4).map((o:ISong,i:number)=>
            <div key={i} className="w-full !bg-cover bg-center" style={{backgroundImage:`url(${o.image})`}}></div>)}

        {play&&<AnimatePresence>
        {(checked)&&<motion.div
        initial={{opacity:0,y:"20%"}}
        exit={{opacity:0,y:"20%"}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4}}
        style={{position:"absolute",bottom:"5%",right:"5%"}}
        >
        <MiscPlayButton fontSize="2.4rem" title={"null"}/>
        </motion.div>}
        </AnimatePresence>}
        </div>
        {!banner&&<h2 className="text-xl font-semibold">{playlist.name}</h2>}
        </div>
     );
}

export default CustomPlaylists;