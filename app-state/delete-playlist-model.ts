import { createSlice } from '@reduxjs/toolkit'

interface state {
    open:boolean,
    id:string|null
}

const initialModelState:state={
    open:false,
    id:null
  }
  
  export const deletePlaylist = createSlice({
    name: 'delete-playlist',
    initialState:initialModelState,
    reducers: {
      openDeleteTab:(state,action)=>({...state,open:true,id:action.payload}),
      closeDeleteTab:(state)=>({...initialModelState}),
    },
  })

export const { openDeleteTab,closeDeleteTab } = deletePlaylist.actions

export default deletePlaylist.reducer