"use client"
import { ListProps, useTheme, Box } from '@mui/material';
import React from 'react';
import { MyDrawer,Props } from './MyDrawer';
import { AccountCircle, Album, Favorite, Info, QueueMusic } from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {List, ListItemButton,ListItemText,ListItemIcon} from '@mui/material'
import { useSession } from 'next-auth/react';
import { ElementType } from 'react';
import Link from 'next/link';

const StyledSideBar=styled(List)<ListProps & { component: ElementType }>(({theme})=>({
 padding:"1rem",
 width:'20.4rem',
 '.MuiListItemButton-root':{
  borderRadius:12,
  ':hover, :hover svg':{
    backgroundColor:theme.palette.secondary.light,
    color:"white"
  },
  '.MuiListItemText-primary':{
    fontWeight:600,
    fontSize:'1rem',
  },
 }
}))
 

function SideBar({...props}:Props) {
const {data}=useSession()
  const theme=useTheme()

  const NavBarSided = ({className}:{className?:string})=><Box className={className}>
<StyledSideBar component='nav' disablePadding>
  <div className='drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white rounded-xl text-gray-700 flex flex-col p-4 gap-2 pb-[4rem]'>
    <div className='flex flex-col items-center relative pb-3'>
      {data?.user && <Link href='/profile'><div className='w-[50px] aspect-[1] mb-3 !bg-cover bg-center rounded-full shadow-xl' style={{background:`url('${data?.user.image}')`}}></div></Link>}
     <p className='font-bold'>{data?.user.infos.name}</p>
     <p className='text-main text-sm'>{data?.user.email}</p>
    </div>
  <div className='pl-3 pb-3 text-xl font-bold text-black'>Browse</div>
  <Link href={"/profile"}>
    <ListItemButton><ListItemIcon>
        <AccountCircle/>
      </ListItemIcon><ListItemText primary="Profile"/></ListItemButton>
      </Link>
  <Link href={"/playlists"}>
    <ListItemButton><ListItemIcon>
        <QueueMusic/>
      </ListItemIcon><ListItemText primary="Playlists"/></ListItemButton>
      </Link>
      <Link href={"/favorites"}>
    <ListItemButton>
    <ListItemIcon>
    <Favorite/>
      </ListItemIcon><ListItemText primary="Favorites" /></ListItemButton>
      </Link>
      <Link href={"/artists"}>
    <ListItemButton>
    <ListItemIcon>
        <Album/>
      </ListItemIcon><ListItemText primary="Artists" /></ListItemButton>
      </Link>
      <Link href={"/infos-and-help"}>
    <ListItemButton>
    <ListItemIcon>
        <Info/>
      </ListItemIcon><ListItemText primary="Info & Help" /></ListItemButton></Link>
      </div>
  </StyledSideBar></Box>

    return ( 
    <>
    <NavBarSided className='hidden lg:block'/>
    <MyDrawer openDrawer={props.openDrawer} handleCloseDrawer={props.handleCloseDrawer}><NavBarSided/></MyDrawer>
    </>
      );
}

export default SideBar;