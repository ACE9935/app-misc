
import { Artist, ArtistInterface} from "@/app/api/models"
import ArtistsGroup from "@/components/ArtistsGroup";

async function getData(artist: string) {
  try {
    const response = await fetch(`${process.env.HOST}/get-similar-artists/api?name=${artist}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle errors here, you can log them or throw a custom error
    console.error('Error in addFavoriteSong:', error);
    throw new Error('Failed to add song to favorites');
  }
}

async function SimilarArtists({artist}:{artist:string}) {
    const data:ArtistInterface[] = await getData(artist)
    return ( 
      <div>
      <div className='p-3 flex justify-between'><h1 className='text-2xl font-bold'>Similar Artists</h1>
      </div>
     <ArtistsGroup data={data}/>
    </div>
     );
}

export default SimilarArtists;