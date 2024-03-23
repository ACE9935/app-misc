
import { Dialog, } from "@mui/material";
import SearchBar from "@/app/(pages)/search/components/SearchBar";
import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
import { closeSearchTab } from "@/app-state/search-model";
import MiscTitle from "./MiscTitle";


function SearchModel() {
    const model=useAppSelector(state=>state.search)
    const dispatch=useAppDispatch()
    return (<Dialog onClose={()=>dispatch(closeSearchTab())} open={model.open}>
        <div className="p-5 flex flex-col gap-4">
        <MiscTitle>Search for...</MiscTitle>
        <SearchBar/>
        </div>
  </Dialog> );
}

export default SearchModel;