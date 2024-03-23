"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CustomPlaylistBanner from '../../components/CustomPlaylistBanner';
import CustomSongs from '@/app/(pages)/favorites/components/CustomSongs';
import SongsFiltered from '@/app/(pages)/favorites/components/SongsFiltered';
import MiscLoader from '@/components/MiscLoader';

function PlaylistIdPage({
  params,
}: {
  params: { id: string }
}) {
  const { data } = useSession();
  const router = useRouter();

  if(!data) return <MiscLoader/>

  const playlist = data.user.infos.info?.playlists.find(element => element._id === params.id);
  
  if (!playlist) {
    // Redirect to 404 page if playlist doesn't exist
    router.replace('/');
    return null; // Return null to prevent rendering anything else
  }
 
  return ( 
    <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-4'>
        <CustomPlaylistBanner playlist={playlist}/>
        <CustomSongs id={playlist._id}/>
        <SongsFiltered songsTab={playlist.songs}/>
      </div>
    </main>
  );
}

export default PlaylistIdPage;
