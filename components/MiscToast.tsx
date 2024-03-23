import { ElementType, ReactNode } from "react";

function MiscToast({title,Icon}:{title:string,Icon:ElementType}) {
    return ( 
        <div className="p-4 rounded-xl bg-[#252729] text-white flex gap-3"><Icon/><p>{title}</p></div>
     );
}

export default MiscToast;