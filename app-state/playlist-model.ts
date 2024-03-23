import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './app-store'
import { ISong } from '@/app/api/models'

interface state {
    open:boolean,
    song?:ISong | null,
    showInput:boolean
}

const initialModelState:state={
    open:false,
    song:null,
    showInput:false,
  }
  
  export const addPlaylistModel = createSlice({
    name: 'add-playlist',
    initialState:initialModelState,
    reducers: {
      open:(state)=>({...state,open:true}),
      close:(state)=>({...initialModelState}),
      setSong:(state,action)=>({...state,song:action.payload}),
      setShowInput:(state,action)=>({...state,showInput:action.payload}),
    },
  })

export const { open,close,setSong,setShowInput } = addPlaylistModel.actions

export default addPlaylistModel.reducer