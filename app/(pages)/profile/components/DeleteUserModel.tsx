import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
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
import { signOut } from 'next-auth/react';
import { closeDeleteUserTab } from "@/app-state/delete-account";

const deletePlaylist = async ({ userId}: { userId: string}) => {
    try {
      const apiUrl = '/delete-account/api';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers like Authorization if needed
        },
        body: JSON.stringify({ userId}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await signOut({ callbackUrl: '/',redirect:false })
  
      return response.json();
    } catch (error) {
      // Handle errors here, you can log them or throw a custom error
      console.error('Error:', error);
      throw new Error('Failed to delete account');
    }
  };

function DeleteUserModel() {
    const {data}=useSession()
    const model=useAppSelector(state=>state.deleteUser)
    const dispatch=useAppDispatch()
    const toast = useToast()
    const router=useRouter()
    const { mutate,isPending } = useMutation({mutationFn:deletePlaylist,onSuccess:()=> {
     router.push('/')
     dispatch(closeDeleteUserTab())
      toast({
      position:'bottom-left',
      render:()=>(<MiscToast title='Account deleted' Icon={Delete}/>),
      duration: 2000,
    })}});
    
  
    const handleClick = async () => {
       mutate({userId:data?.user?.infos._id})
    }

    return (<Dialog onClose={()=>dispatch(closeDeleteUserTab())} open={model.open}>
    <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-end">
    <IconButton onClick={()=>dispatch(closeDeleteUserTab())}><CloseOutlined sx={{fontSize:30}}/></IconButton>
    </div>
      <h1 className="text-xl pb-4 font-bold">You are sure want to delete your account ?</h1>
      <div className="flex gap-3">
        {isPending?<Loader/>:<><SignInBtnBasicFilled handleClick={handleClick}>Continue</SignInBtnBasicFilled>
        <SignInBtnBasic handleClick={()=>dispatch(closeDeleteUserTab())}>Cancel</SignInBtnBasic></>}
        </div>
        </div>
  </Dialog> );
}

export default DeleteUserModel;