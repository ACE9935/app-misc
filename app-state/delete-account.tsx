import { createSlice } from '@reduxjs/toolkit'

interface state {
    open:boolean,
    id:string|null
}

const initialModelState:state={
    open:false,
    id:null
  }
  
  export const deleteUser = createSlice({
    name: 'delete-playlist',
    initialState:initialModelState,
    reducers: {
      openDeleteUserTab:(state,action)=>({...state,open:true,id:action.payload}),
      closeDeleteUserTab:(state)=>({...initialModelState}),
    },
  })

export const { openDeleteUserTab,closeDeleteUserTab } = deleteUser.actions

export default deleteUser.reducer