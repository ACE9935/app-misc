import MiscTitle from "@/components/MiscTitle";
import { ReactNode } from "react";

function ArtistDescription({children}:{children:ReactNode}) {
    return ( 
        <div className="p-3 flex flex-col gap-3">
        <MiscTitle>Description</MiscTitle>
        <div className="rounded-2xl p-6 text-2xl bg-main text-white">
         {children}
        </div>
        </div>
     );
}

export default ArtistDescription;