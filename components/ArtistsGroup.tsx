"use client"
import { ArtistInterface} from "@/app/api/models"
import styles from './artists.module.scss'
import { useRouter } from "next/navigation";


function ArtistsGroup({data}:{data:ArtistInterface[]}) {  
    const router=useRouter()
    return ( 
   
      <div
      className="grid grid-flow-row grid-cols-4 sm:grid-cols-6 md:grid-cols-7"
    >
     {data?.map((o:ArtistInterface,i:number)=>
     <div
     onClick={()=>router.push(`/artists/${encodeURIComponent(o.name)}`)}
     className={`flex flex-col items-center gap-2 rounded-md hover:bg-black/10 cursor-pointer p-2 sm:p-3 ${styles.child}`} key={i}>
            <div className="w-full !bg-cover !bg-center aspect-square rounded-full" style={{background:`url(${o.image})`}}></div>
            <div className="flex flex-col gap-2">
                <h4 className="text-slate-500 text-lg text-center">{o.name}</h4>
            </div>
     </div>)}
    </div>
     );
}

export default ArtistsGroup;