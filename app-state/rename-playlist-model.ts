import { createSlice } from '@reduxjs/toolkit'

interface state {
    open:boolean,
    id:string|null
    name:string
}

const initialModelState:state={
    open:false,
    id:null,
    name:""
  }
  
  export const renamePlaylist = createSlice({
    name: 'rename-playlist',
    initialState:initialModelState,
    reducers: {
      openEditTab:(state,action)=>({...state,open:true,id:action.payload.id,name:action.payload.name}),
      closeEditTab:(state)=>({...initialModelState}),
    },
  })

export const { openEditTab,closeEditTab } = renamePlaylist.actions

export default renamePlaylist.reducer