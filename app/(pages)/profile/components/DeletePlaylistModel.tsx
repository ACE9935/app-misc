import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
import { closeDeleteTab } from "@/app-state/delete-playlist-model";
import MiscToast from "@/components/MiscToast";
import { useSession } from 'next-auth/react';
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import { useToast } from "@chakra-ui/react";
import { CloseOutlined, Delete } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SignInBtnBasicFilled from "@/components/signIn/SignInBtnBasicFilled";
import Loader from "@/components/Loader";

const deletePlaylist = async ({ userId,id,update }: { userId: string,id:string,update:any }) => {
    try {
      const apiUrl = '/delete-playlist/api';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers like Authorization if needed
        },
        body: JSON.stringify({ id,userId}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await update()
  
      return response.json();
    } catch (error) {
      // Handle errors here, you can log them or throw a custom error
      console.error('Error in addFavoriteSong:', error);
      throw new Error('Failed to add song to favorites');
    }
  };

function DeletePlaylistModel() {
    const {data,status,update}=useSession()
    const model=useAppSelector(state=>state.deletePlaylist)
    const dispatch=useAppDispatch()
    const toast = useToast()
    const router=useRouter()
    const { mutate,isPending } = useMutation({mutationFn:deletePlaylist,onSuccess:()=> {
      
     router.push('/')
     dispatch(closeDeleteTab())
      toast({
      position:'bottom-left',
      render:()=>(<MiscToast title='Playlist deleted' Icon={Delete}/>),
      duration: 2000,
    })}});
    
  
    const handleClick = async () => {
       mutate({userId:data?.user?.infos._id,id:model.id!,update})
    }

    return (<Dialog onClose={()=>dispatch(closeDeleteTab())} open={model.open}>
    <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-end">
    <IconButton onClick={()=>dispatch(closeDeleteTab())}><CloseOutlined sx={{fontSize:30}}/></IconButton>
    </div>
      <h1 className="text-xl pb-4 font-bold">You sure want to delete this playlist ?</h1>
      <div className="flex gap-3">
        {isPending?<Loader/>:<><SignInBtnBasicFilled handleClick={handleClick}>Continue</SignInBtnBasicFilled>
        <SignInBtnBasic handleClick={()=>dispatch(closeDeleteTab())}>Cancel</SignInBtnBasic></>}
        </div>
        </div>
  </Dialog> );
}

export default DeletePlaylistModel;