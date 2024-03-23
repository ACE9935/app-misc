"use client"
import {styled} from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/app-state/app-hooks';
import { ISong } from '@/app/api/models';
import {play} from '../../app-state/app-state'
import MiscPlayButton from '../MiscPlayButton';
import { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import Link from 'next/link';

const StyledImage=styled("div")(({theme})=>({
  position:"relative",
  "&:after":{
    content: '""',
    display: "block",
    position: "absolute",
    bottom:0,
    width: "100%",
    height: "30px",
    transform:'rotate(180deg) translateY(-110%)',
    zIndex:-1,
    borderRadius:"inherit",
    filter:"blur(20px)",
    opacity:0.4,
    backgroundSize:"contain",
    background: "inherit",
  }
 }))

function TopSongcard({...props}:ISong) {
  const dispatch=useAppDispatch()
  const song=useAppSelector(selectSong=>selectSong.song)
  const [checked,setChecked]=useState(false)

    return ( 
        <div
        onMouseEnter={()=>setChecked(true)}
        onMouseLeave={()=>setChecked(false)}
        onClick={()=>dispatch(play({...props}))}
        className='cursor-pointer'>
        <StyledImage style={{backgroundImage:`url(${props.image})`}} className='bg-cover bg relative bg-center w-[10rem] sm:w-[16rem] aspect-square rounded-2xl drop-shadow-2xl'>
        <AnimatePresence>
        {((song.playing&&song.title==props.title)||checked)&&<motion.div
        initial={{opacity:0,y:"20%"}}
        exit={{opacity:0,y:"20%"}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4}}
        style={{position:"absolute",bottom:"5%",right:"5%"}}
        >
        <MiscPlayButton title={props.title}/>
        </motion.div>}
        </AnimatePresence>
        </StyledImage>
        <div className='pt-4  w-[10rem] sm:w-[16rem]'>
        <h2 className='text-xl sm:text-2xl font-bold line-clamp-2'>{props.title}</h2>
        <Link href={`/artists/${encodeURIComponent(props.artistName!)}`}><p className='line-clamp-2 text-md sm:text-lg text-slate-500'>{props.artist}</p></Link>
        </div>
        </div>
     );
}

export default TopSongcard;