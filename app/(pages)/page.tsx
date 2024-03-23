
import type { NextPage } from 'next'
import TopSongs from '@/components/hero/TopSongs'
import PlaylistsCarousel from '@/components/hero/PlaylistsCarousel'
import SongsAndArtists from '@/components/hero/SongsAndArtists/SongsAndArtists'

const Home: NextPage = () => {

  return (
    <main className='min-w-0'>
      <TopSongs/>
      <PlaylistsCarousel/>
      <SongsAndArtists/>
   </main>
  )
}

export default Home