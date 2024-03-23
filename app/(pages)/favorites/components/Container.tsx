"use client"
import { useSession } from 'next-auth/react';
import FavoritesBanner from "../components/FavoritesBanner";
import FavoriteSongs from "../components/FavoriteSongs";
import SongsFiltered from './SongsFiltered';
import MiscLoader from '@/components/MiscLoader';

function Container() {
    const {data}=useSession()
    const userInfos=data?.user.infos.info

    if(!data) return <MiscLoader/>

    return ( 
    <div className="p-3">
     <FavoritesBanner lengthOfSongs={data?.user.infos.info?.favorites.length}/>
     <FavoriteSongs/>
     <SongsFiltered songsTab={data?.user.infos.info?.favorites!}/>
    </div>
        );
}

export default Container;