"use client"
import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

function ArtistsPagination({genre,numberofPagesOfGenre,limit}:{genre:string,numberofPagesOfGenre:number,limit:number}) {
    return ( 
        <Pagination
        size="large"
      count={Math.ceil(numberofPagesOfGenre/limit)}
      renderItem={(item) => (
        <PaginationItem
          component={Link} // Use Link component for navigation
          href={`/artists/genres/${encodeURIComponent(genre)}/?page=${item.page}`} // Construct the URL here
          {...item}
        />
      )}
       />
     );
}

export default ArtistsPagination;