"use client";
import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useAppSelector,useAppDispatch } from "../../app-state/app-hooks";
import {nextSong, nextSongBasedOnArtist, nextSongBasedOnPlaylist, pause,playCustom,resume} from "../../app-state/app-state"

function SongPlayer() {
    const dispatch=useAppDispatch()
    const song=useAppSelector(selectSong=>selectSong.song)
    const player = useRef<AudioPlayer>(null);
    useEffect(()=>{
       const audio=document.querySelector('audio') as HTMLAudioElement
       audio.src=song.audio!
    },[song.title])

    useEffect(() => {
      const audio = player?.current?.audio?.current;

      if (audio) {
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
    }, [song.paused]);
    
    return ( 
        <AudioPlayer
        ref={player}
        volume={0.5}
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
      onEnded={()=> song.playingCustom?dispatch(playCustom({songs:song.customList,index:song.indexOfCustom!+1})):song.playingPlaylist?dispatch(nextSongBasedOnPlaylist({indexS:(song.indexOfSongInAlbum!+1),genre:song.playlisGenres!})):song.playingArtistAlbum?dispatch(nextSongBasedOnArtist({indexS:(song.indexOfSongInAlbum!+1),artist:song.artistName!})):dispatch(nextSong({indexS:Number(song.indexOfSong)+1,genre:song.genre?.[0] ?? 'defaultGenre'}))}
      onClickNext={()=>
        song.playingCustom?dispatch(playCustom({songs:song.customList,index:song.indexOfCustom!+1})):song.playingPlaylist?dispatch(nextSongBasedOnPlaylist({indexS:(song.indexOfSongInAlbum!+1),genre:song.playlisGenres!})):song.playingArtistAlbum?dispatch(nextSongBasedOnArtist({indexS:(song.indexOfSongInAlbum!+1),artist:song.artistName!})):dispatch(nextSong({indexS:Number(song.indexOfSong)+1,genre:song.genre?.[0] ?? 'defaultGenre'}))}
      onClickPrevious={()=>
        song.playingCustom?dispatch(playCustom({songs:song.customList,index:song.indexOfCustom!-1})):song.playingPlaylist?dispatch(nextSongBasedOnPlaylist({indexS:(song.indexOfSongInAlbum!-1),genre:song.playlisGenres!})):song.playingArtistAlbum?dispatch(nextSongBasedOnArtist({indexS:(song.indexOfSongInAlbum!-1),artist:song.artistName!})): dispatch(nextSong({indexS:Number(song.indexOfSong)-1,genre:song.genre?.[0] ?? 'defaultGenre'}))}
    />
     );
}

export default SongPlayer;