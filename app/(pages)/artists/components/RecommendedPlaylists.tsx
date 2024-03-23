import { ISongPlaylist } from "@/app/api/models";
import Playlist from "../../playlists/components/Playlist";
import MiscTitle from "@/components/MiscTitle";

function RecommendedPlaylists({playlists}:{playlists:ISongPlaylist[]}) {
    return ( 
        <div className="flex flex-col gap-4">
          <MiscTitle>Recommended Playlists</MiscTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {playlists.map((o:ISongPlaylist,i:number)=><div className="cursor-pointer" key={i}>
            <Playlist songObject={o} play/>
            <h2 className="text-xl font-semibold">{o.name}</h2>
            </div>)}
        </div>
        </div>
     );
}

export default RecommendedPlaylists;