import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
import { ISong } from "@/app/api/models";
import MiscPlayButton from "@/components/MiscPlayButton";
import { nextSongBasedOnArtist, nextSongBasedOnPlaylist, play,playCustom} from "@/app-state/app-state";
import AddFavourite from "@/components/SongControlTools/AddFavourite";
import AddToPlaylist from "@/components/SongControlTools/AddToPlaylist";
import { useRouter } from "next/navigation";

function SongPlayerBasic({songObject,albumPlay,playlistPlay,songIndex,customPlaylist}:{songObject:ISong,albumPlay?:boolean,playlistPlay?:string[],songIndex?:number,customPlaylist?:ISong[]}) {
    const dispatch=useAppDispatch()
    const song=useAppSelector(selectSong=>selectSong.song)
    const router=useRouter()
   
    return ( 
    <div 
    onClick={()=>{
    if(customPlaylist) dispatch(playCustom({songs:customPlaylist,index:songIndex}))
    else if(albumPlay) dispatch(nextSongBasedOnArtist({indexS:songIndex!,artist:songObject.artistName!}))
    else if(playlistPlay) dispatch(nextSongBasedOnPlaylist({indexS:songIndex!,genre:playlistPlay!}))
    else dispatch(play({...songObject}))
}}
    {...(song.title==songObject.title?{
        style:{background:'white',
               filter:"drop-shadow(0 15px 15px rgb(233 30 99 / 0.15))"
        }}:{})} className="flex cursor-pointer max-w-full w-[33rem] rounded-full py-2 px-4 hover:bg-black/20">
    <div className="flex gap-5 items-center grow">
        <div className="hidden xs:block"><MiscPlayButton fontSize="1.3rem" title={songObject.title}/></div>
        <div className="w-[3rem] xs:w-[4rem] !bg-cover !bg-center aspect-square rounded-full shrink-0" style={{background:`url(${songObject.image})`}}></div>
        <div className="flex flex-col relative right-2 grow w-0">
            <h5 className="font-bold">{songObject.title}</h5>
            <p className="text-slate-500 text-sm overflow-hidden text-ellipsis"><span onClick={(e)=>{
                e.stopPropagation()
                router.push(`/artists/${encodeURIComponent(songObject.artistName!)}`)
            }} className="truncate hover:underline text-ellipsis">
                {songObject.artist}</span></p>
        </div>
    </div>
    <div className="flex gap-2 items-center">
        <AddToPlaylist song={{...songObject}}/>
        <AddFavourite song={{...songObject}}/>
        <p className="text-slate-500">{songObject.duration}</p>
    </div>
    </div>
     );
}

export default SongPlayerBasic;