import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
import { close,setShowInput } from "@/app-state/playlist-model";
import PlaylistForm from "./PlaylistForm";
import { CloseOutlined, } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog,IconButton } from "@mui/material";
import { useSession } from 'next-auth/react';
import AddToNamedPlaylist from "./AddToNamedPlaylist";


function AddToPlaylistModel() {
    const model=useAppSelector(state=>state.addPlaylist)
    const {data}=useSession()
    const dispatch=useAppDispatch()
    const playlistsLength=data?.user.infos.info?.playlists.length
    return ( 
        <Dialog onClose={()=>dispatch(close())} open={model.open}>
            <div className="bg-white p-5 w-[18rem] flex flex-col items-center gap-7">
             <div className="flex items-center justify-between w-full">
                <h1 className="text-xl font-bold">Add to...</h1><IconButton onClick={()=>dispatch(close())}><CloseOutlined sx={{fontSize:30}}/></IconButton>
                </div>
                {model.showInput?
                <PlaylistForm/>
                :<>
            <div className="overflow-auto max-h-[14rem]">
                {!playlistsLength?<div>You've not created any playlists</div>:<div className="flex flex-col">{data?.user.infos.info?.playlists.map((o,i)=>
                <div className="flex gap-4 items-center" key={i}><AddToNamedPlaylist playlist={{...o}}/></div>
                )}</div>}
            </div>
            <Button onClick={()=>dispatch(setShowInput(true))} className="!mt-6 !w-fit" startIcon={<AddIcon />}>Create new playlist</Button>
            </>}
            </div>
        </Dialog>
     );
}

export default AddToPlaylistModel;