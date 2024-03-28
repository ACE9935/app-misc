"use client";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useAppSelector,useAppDispatch } from "../../app-state/app-hooks";
import {nextSong, pause,playCustom,resume,setShuffle as dispatchSetShuffle} from "../../app-state/app-state"
import { Repeat, RepeatOn, Shuffle, ShuffleOn } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

function SongPlayer() {
    const dispatch=useAppDispatch()
    const [loop,setLoop]=useState(false)
    const song=useAppSelector(selectSong=>selectSong.song)
    const [shuffle,setShuffle]=useState(false)
    const player = useRef<AudioPlayer>(null);
    useEffect(()=>{
       const audio=document.querySelector('audio') as HTMLAudioElement
       audio.src=song.audio!
    },[song.title])

    useEffect(() => {
      const audio = player?.current?.audio?.current;

      if (audio) {
        if(loop) audio.loop=true
        else audio.loop=false
        var isPlaying = audio?.currentTime > 0  
    && audio.readyState > audio.HAVE_CURRENT_DATA;
        if (song.paused) {
          audio.pause();
        } else {
          if(isPlaying)audio.play().catch(error => {
            console.error('Error playing audio:', error);
          });
        }
      }
    }, [song.paused,loop]);
    
    useEffect(()=>{
      dispatch(dispatchSetShuffle(shuffle))
    },[shuffle])

    const LoopButton= function(){
      return <Checkbox
      checked={loop}
      onClick={async function(e){
       setLoop(o=>!o)
      }}
      checkedIcon={<RepeatOn/>}
      icon={<Repeat/>}
    />
    }
    
    const ShuffleButton= function({disabled}:{disabled:boolean}){

      return <Checkbox
      disabled={disabled}
      sx={{opacity:disabled?0.5:1}}
      checked={song.randomPlay}
      onClick={async function(e){
       setShuffle(o=>!o)
      }}
      checkedIcon={<ShuffleOn/>}
      icon={<Shuffle/>}
    />
    }
    
    
    return ( 
        <AudioPlayer
        customAdditionalControls={[
        <div className="flex"><ShuffleButton disabled={song.customList.length==0 || song.customList.length<3}/>
        <LoopButton/></div>]}
        ref={player}
        volume={0.6}
        src={`${song.title}.mp3`}
        autoPlay
      style={{background:'none',boxShadow:'none',width:'100%' }}
      onPlay={(e) =>{
        dispatch(resume())
      }}
      onPause={()=>{
        dispatch(pause())
      }}
      showSkipControls={true}
      onEnded={()=> song.playingCustom?dispatch(playCustom({songs:song.customList,controlled:true,action:"next",_id:song._id})):dispatch(nextSong({indexS:song._id,genre:song.genre?.[0] ?? 'defaultGenre',action:"next"}))}
      onClickNext={()=>
        song.playingCustom?dispatch(playCustom({songs:song.customList,controlled:true,action:"next",_id:song._id})):dispatch(nextSong({indexS:song._id,genre:song.genre?.[0] ?? 'defaultGenre',action:"next"}))}
      onClickPrevious={()=>
        song.playingCustom?dispatch(playCustom({songs:song.customList,controlled:true,action:"prev",_id:song._id})):dispatch(nextSong({indexS:song._id,genre:song.genre?.[0] ?? 'defaultGenre',action:"prev"}))}
    />
     );
}

export default SongPlayer;