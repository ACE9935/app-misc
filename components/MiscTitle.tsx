import { ReactNode } from "react";

function MiscTitle({children}:{children:ReactNode}) {
    return ( 
        <h1 className='text-2xl font-bold'>{children}</h1>
     );
}

export default MiscTitle;