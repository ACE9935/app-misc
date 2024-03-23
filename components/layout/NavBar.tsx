"use client";
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Logo } from '../Logo';
import { signOut, useSession } from 'next-auth/react';
import SignInBtnBasic from '../signIn/SignInBtnBasic';
import Loader from '../Loader';
import { useAppDispatch } from '@/app-state/app-hooks';
import { open } from '@/app-state/model-state';
import SearchBar from '@/app/(pages)/search/components/SearchBar';
import { Search } from '@mui/icons-material';
import { openSearchTab } from '@/app-state/search-model';

interface Props {
    children?:  any
    handleOpenDrawer?:()=>void
  }

function NavBar({handleOpenDrawer}:Props) {
    const {data,status}=useSession()
    const dispatch=useAppDispatch()

    return ( 
        <div className='w-full'>
          <Toolbar>
            <Logo interactive link/>
            <div className='flex items-center gap-5'>
              <div className='hidden lg:block'>
             <SearchBar/>
             </div>
             <div className='block lg:hidden'>
             <IconButton onClick={()=>dispatch(openSearchTab())}>
              <Search/>
             </IconButton>
             </div>
            {(!data&&status=='loading')?<Loader/>:data?.user?<div className='flex items-center'>
            <SignInBtnBasic handleClick={()=>signOut()}>Sign Out</SignInBtnBasic>
            </div>:<SignInBtnBasic handleClick={()=>dispatch(open())}>Sign In</SignInBtnBasic>}
            </div>
            <div className='block lg:hidden'>
            <IconButton 
            onClick={handleOpenDrawer}
            disableRipple><MenuIcon fontSize='large' color='secondary'/></IconButton>
            </div>
          </Toolbar>
      </div>
     );
}

export default NavBar;