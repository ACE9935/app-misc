
import MiscTitle from "@/components/MiscTitle";
import { ISongPlaylist } from "@/app/api/models";
import { Playlist as PlaylistModel } from "@/app/api/models";
import Playlist from "./components/Playlist";

export async function generateMetadata(
  { params, searchParams }: {
    params: { artist: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
 
  return {
    title: `Misc - Playlists`,
  }
}

async function getData() {
  try {
    let playlists = await PlaylistModel.find({}, { _id: 0 });
    return playlists.map(doc => doc.toObject());
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}


async function Playlists() {

    const data=await getData()

    return ( 
     <div className="p-3 flex flex-col gap-4">
        <MiscTitle>Playlists</MiscTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((o:ISongPlaylist,i:number)=><div className="cursor-pointer" key={i}>
            <Playlist songObject={o} play/>
            <h2 className="text-xl font-semibold">{o.name}</h2>
            </div>)}
        </div>
     </div>
     );
}

export default Playlists;