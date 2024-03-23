"use client"
import { ISongPlaylist } from "@/app/api/models";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MiscPlayButton from "@/components/MiscPlayButton";

function PlaylistCard({songObject,play}:{songObject:ISongPlaylist,play?:boolean}) {
  const router = useRouter();
  const [checked,setChecked]=useState(false)

    return ( 
        <div
        onClick={()=>router.push("/playlists/"+encodeURIComponent(songObject.name!))}
        onMouseEnter={()=>setChecked(true)}
        onMouseLeave={()=>setChecked(false)}
        className="relative">
          <img className="w-full" src={songObject.image}/>
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
     );
}

export default PlaylistCard;