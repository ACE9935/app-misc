"use client"
import { ArtistInterface } from "@/app/api/models";
import { Genre } from "@/app/types/main-genres";
import MiscTitle from "@/components/MiscTitle";
import ArtistCard from "./ArtistCard";
import React from "react";
import SignInBtnBasic from "@/components/signIn/SignInBtnBasic";
import Link from "next/link";

function ArtistsTabForPage({genre,artists,navigate}:{genre:Genre|string,artists:ArtistInterface[],navigate:boolean}) {
    
    return ( 
        <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between">
        <MiscTitle>{genre}</MiscTitle>
        {navigate&&<Link href={"/artists/genres/"+encodeURIComponent(genre)+"?page=1"}><SignInBtnBasic handleClick={()=>0}>See all</SignInBtnBasic></Link>}
        </div>
        <div className="grid gap-1 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
            {artists.map((o:ArtistInterface,i:number)=><React.Fragment key={i}><ArtistCard {...o}/></React.Fragment>)}
        </div>
        </div>
     );
}

export default ArtistsTabForPage;