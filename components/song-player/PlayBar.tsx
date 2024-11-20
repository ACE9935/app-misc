"use client";
import { Close } from "@mui/icons-material";
import { Snackbar,Avatar, Typography, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Draggable from "react-draggable";
import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../../app-state/app-hooks";
import {stop} from '../../app-state/app-state'
import SongPlayer from "./SongPlayer";
import Link from "next/link";
import AddFavourite from "../SongControlTools/AddFavourite";
import AddToPlaylist from "../SongControlTools/AddToPlaylist";

function PlayBar() {
  const song=useAppSelector(selectSong=>selectSong.song)
  const dispatch=useAppDispatch()
  
  const fetchArtist = async () =>{
    const playlists= await fetch(`/get-artist/api?artist=${encodeURIComponent(song.artistName!)}`)
    .then(data=>data.json())
    .catch(e=>{throw e})

    return playlists.data
  }

  const {
    data,
    isLoading,
    isFetching,
    refetch
  } = useQuery({
   queryKey: ["artist"],
   queryFn: ()=>fetchArtist()
 })

 useEffect(() => { refetch() }, [song.title,refetch])

    return ( 
      <Draggable>
        <Snackbar
         open={song.playing}
         className="active:cursor-grabbing"
         sx={{'*':{color:'white !important'}}}        
        >
        <div style={{background:`url(${song.image})`}} className='!bg-[rgba(0,0,0,0.5)] w-full xs:w-[27rem] flex-col !bg-blend-multiply !bg-cover !bg-center p-3 shadow-lg rounded-md items-center space-y-3'>
            <div className='space-x-0 flex flex-row items-center w-full'>
            <Link href={`/artists/${encodeURIComponent(song.artistName!)}`}><Tooltip title={song.artistName}><Avatar src={data&&!isFetching?data[0]?.image:"/loading.gif"}></Avatar></Tooltip></Link>
            <Typography className="!px-2 !truncate !text-ellipsis" flexGrow={1} component="div">
            <h3 className="!truncate !text-ellipsis text-xl font-bold"><Tooltip title={song.title}><span>{song.title}</span></Tooltip></h3>
            <p className="w-full text-[0.85rem]">
             <span className="!truncate !text-ellipsis hover:underline"><Link href={`/artists/${encodeURIComponent(song.artistName!)}`}>{song.artist}</Link></span>
          </p>
          </Typography>
          <AddToPlaylist song={song}/>
          <AddFavourite song={song}/>
          <IconButton onClick={()=>dispatch(stop())}>
            <Close/>
          </IconButton>
          </div>
          <SongPlayer/>
            </div>
        </Snackbar>
      </Draggable>
     );
}

export default PlayBar;
