import { createSlice } from '@reduxjs/toolkit'

interface state {
    open:boolean,

}

const initialModelState:state={
    open:false,
  }
  
  export const renameUser = createSlice({
    name: 'rename-playlist',
    initialState:initialModelState,
    reducers: {
      openEditUserNameTab:(state)=>({...state,open:true}),
      closeEditUserNameTab:(state)=>({...initialModelState}),
    },
  })

export const { openEditUserNameTab,closeEditUserNameTab } = renameUser.actions

export default renameUser.reducer