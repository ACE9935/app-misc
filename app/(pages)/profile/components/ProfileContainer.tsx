"use client"
import ArtistsGroup from '@/components/ArtistsGroup';
import MiscTitle from '@/components/MiscTitle';
import SignInBtnBasic from '@/components/signIn/SignInBtnBasic';
import { useSession } from 'next-auth/react';
import CustomPlaylists from '../components/CustomPlaylists';
import Link from 'next/link';
import MiscLoader from '@/components/MiscLoader';

function ProfileContainer() {
    const {data}=useSession()
    
    if(!data) return <MiscLoader/>
    const userInfos=data?.user.infos.info
    return ( <div className="p-3">
     <div className="bg-red-200 rounded-2xl p-3 py-6 flex-col sm:flex-row flex gap-8 items-center">
      <img src={data?.user.image} className='w-[10rem] shadow-2xl rounded-full'/>
      <div className='gap-3 flex flex-col'>
        <h2 className='font-semibold text-slate-600 text-xl'>Profile</h2>
        <h1 className='text-3xl sm:text-5xl font-bold break-all'>{data?.user.name}</h1>
        <div>
            <span className='font-semibold '>{`${userInfos?.playlists.length} playlists created / `}</span>
            <span className='font-semibold '>{`${userInfos?.favorites.length} titles liked / `}</span>
            <span className='font-semibold '>{`${userInfos?.favoriteArtists.length} artists liked`}</span>
        </div>
      </div>
     </div>
     <div className='flex flex-col gap-4 pt-6'>
        {userInfos?.favoriteArtists.length?<div className='flex justify-between'>
            <MiscTitle>Favorite artists</MiscTitle>
            <Link href={"/profile/favorite-artists"}><SignInBtnBasic>See all</SignInBtnBasic></Link>
        </div>:<></>}
        <ArtistsGroup data={userInfos?.favoriteArtists.slice(0, 7)!}/>
        {userInfos?.playlists.length?<div className='flex flex-col gap-4 pt-6'>
        <div className='flex justify-between'>
            <MiscTitle>Your playlists</MiscTitle>
            {userInfos?.playlists.length!>4&&<Link href={"/profile/custom-playlists"}><SignInBtnBasic>See all</SignInBtnBasic></Link>}
        </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {userInfos?.playlists.slice(0, 4).map((o,i)=><CustomPlaylists play key={i} playlist={o}/>)}</div>
        </div>:<></>}
     </div>
    </div> );
}

export default ProfileContainer;