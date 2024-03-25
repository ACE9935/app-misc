"use client";
import SideBar from './SideBar';
import NavBar from './NavBar';
import { useState } from 'react';
import AddToPlaylistModel from '../SongControlTools/AddPlaylistModel';
import SignInDialog from '../signIn/SignInDialog';
import DeletePlaylistModel from '@/app/(pages)/profile/components/DeletePlaylistModel';
import RenamePlaylistModel from '@/app/(pages)/profile/components/RenamePlaylistModel';
import SearchModel from '../SearchModel';
import DeleteUserModel from '@/app/(pages)/profile/components/DeleteUserModel';
import RenameUserModel from '@/app/(pages)/profile/components/RenameUserModel';

function PageWrapper({children}:{children:React.ReactNode}) {
    const [openDrawer,setOpenDrawer]=useState(false)
    return ( 
        <div className='flex'>
         
        <SideBar openDrawer={openDrawer} handleCloseDrawer={()=>setOpenDrawer(false)}/>
    <div className='!w-full min-w-[0] flex flex-col'>
        <NavBar handleOpenDrawer={()=>setOpenDrawer(prev=>!prev)}/>
        <div className='max-w-[1100px] pt-4 relative'>
      {children}
      </div>
      </div>
      <SignInDialog/>
      <RenameUserModel/>
      <DeleteUserModel/>
      <AddToPlaylistModel/>
      <DeletePlaylistModel/>
      <RenamePlaylistModel/>
      <SearchModel/>
      </div>
     );
}

export default PageWrapper;