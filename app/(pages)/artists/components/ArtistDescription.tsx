import MiscTitle from "@/components/MiscTitle";
import { ReactNode } from "react";

function ArtistDescription({children}:{children:ReactNode}) {
    return ( 
        <div className="flex flex-col gap-3">
        <MiscTitle>Description</MiscTitle>
        <div className="rounded-2xl p-3 sm:p-6 text-xl sm:text-2xl bg-main text-white">
         {children}
        </div>
        </div>
     );
}

export default ArtistDescription;