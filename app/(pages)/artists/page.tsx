import { ArtistInterface } from '@/app/api/models'
import { Genre } from '@/app/types/main-genres'
import ArtistsTabForPage from './components/ArtistsTabForPage'

export type ArtistsTab= {genre:Genre,artists:ArtistInterface[]}

export const metadata = {
  title: 'Misc - Artists', 
}

async function getData() {
  try {
    const res = await fetch(`${process.env.HOST}/get-artists-page/api`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}
export default async function Artists() {
  const data:{data:ArtistsTab[]} = await getData()
 
  return (
    <main className='min-w-0'>
      <div className='p-3 flex flex-col gap-5 py-5'>{data?.data.map((o:ArtistsTab,i:number)=><ArtistsTabForPage navigate key={i} {...o}/>)}</div>
   </main>
  )
}
