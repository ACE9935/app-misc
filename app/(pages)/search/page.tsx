
import SearchContainer from "./components/Container";

export const revalidate = 0;
export const dynamic='force-dynamic'

export async function generateMetadata(
  { params, searchParams }: {
    params: { artist: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
 
  return {
    title: `Misc - Search`,
  }
}

function escapeRegex(term: string) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getData(termx: string) {
  const term = escapeRegex(termx);
  try {
    const response = await fetch(`${process.env.HOST}/get-search-results/api?term=${term}`);

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

  

async function SearchPage({
    searchParams,
  }: {
    searchParams: { [term: string]: string }
  }) {
   
  const data=await getData(decodeURIComponent(searchParams?.term!))

  return (
    <SearchContainer data={data}/>
  )
}

export default SearchPage;