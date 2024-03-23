"use client"
import { useAppDispatch } from "@/app-state/app-hooks";
import { closeSearchTab } from "@/app-state/search-model";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField} from "@mui/material";
import {styled} from '@mui/material/styles';
import { useRouter } from "next/navigation";
import { useState } from "react";

const StyledInput=styled(TextField)(()=>({
    "&, & *":{
      border:"none !important",
      outline:"none !important"
    }
   }))

function SearchBar() {
    const [value,setValue]=useState("")
    const dispatch=useAppDispatch()
    const router=useRouter()

    const handleClick = () => {
      if (value.length) {
          const encodedValue = encodeURIComponent(value.replace(/%/g, '%25'));
          router.push(`/search?term=${encodedValue}`);
          dispatch(closeSearchTab());
      }
  }

    return ( 
        <form onSubmit={(e)=>{
         e.preventDefault()
         handleClick()
        }}>
        <StyledInput
        onChange={(e)=>setValue(e.target.value)}
        value={value}
        sx={{border:"unset"}}
         InputProps={{
           startAdornment: (
             <InputAdornment onClick={handleClick} className='cursor-pointer' position="start">
               <Search />
             </InputAdornment>
           ),
         }}
         type='text'
         placeholder='Search for song, artists ect...'
        size='small' className='!bg-white w-[22rem] !rounded-full !shadow-md'/>
        </form>
     );
}

export default SearchBar;