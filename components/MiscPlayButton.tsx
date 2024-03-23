import { PlayArrow, Pause } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
import { pause, resume } from "@/app-state/app-state";

function MiscPlayButton({className,title,fontSize,...props}:any) {
    const song=useAppSelector(selectSong=>selectSong.song)
    const dispatch=useAppDispatch()
    return ( 
        <>
            { (song.playing&&song.title==title&&!song.paused)?<IconButton {...props} className={`!bg-main !rounded-full ${className}`} onClick={()=>dispatch(pause())}><Pause style={{fontSize:fontSize||"2rem"}} className="!text-white"/></IconButton>:<IconButton {...props} className={`!bg-main !rounded-full ${className}`} onClick={()=>dispatch(resume())}><PlayArrow style={{fontSize:fontSize||"2rem"}} className="!text-white"/></IconButton>}
        </>
     );
}

export default MiscPlayButton;