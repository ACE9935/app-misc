"use client"
import { ArtistInterface } from "@/app/api/models";
import MiscPlayButton from "@/components/MiscPlayButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ArtistCard({...o}:ArtistInterface) {
    const router = useRouter();
    const [checked,setChecked]=useState(false)
    return ( 
        <div
        onClick={()=>router.push(`/artists/${encodeURIComponent(o.name)}`)}
        onMouseEnter={()=>setChecked(true)}
        onMouseLeave={()=>setChecked(false)}
        className={`flex flex-col items-center gap-2 p-3 rounded-md hover:bg-black/10 cursor-pointer`}>
        <div className="!bg-cover !bg-center aspect-square w-full rounded-full relative" style={{background:`url(${o.image})`}}>
        <AnimatePresence>
        {(checked)&&<motion.div
        initial={{opacity:0,y:"20%"}}
        exit={{opacity:0,y:"20%"}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4}}
        style={{position:"absolute",bottom:"5%",right:"5%"}}
        >
        <MiscPlayButton title={"null"}/>
        </motion.div>}
        </AnimatePresence>
        </div>
        <div className="flex flex-col gap-2">
            <h4 className="text-slate-500 text-lg text-center">{o.name}</h4>
        </div>
        </div>
     );
}

export default ArtistCard;