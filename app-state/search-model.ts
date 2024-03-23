import { createSlice } from '@reduxjs/toolkit'

interface state {
    open:boolean,
}

const initialModelState:state={
    open:false,
  }
  
  export const search = createSlice({
    name: 'search',
    initialState:initialModelState,
    reducers: {
      openSearchTab:(state)=>({open:true}),
      closeSearchTab:(state)=>({open:false}),
    },
  })

export const { openSearchTab,closeSearchTab } = search.actions

export default search.reducer