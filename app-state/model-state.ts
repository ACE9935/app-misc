import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './app-store'

interface state {
    open:boolean,
    email:string,
    verify:boolean,
    showForm:boolean
}

const initialModelState:state={
    open:false,
    email:'',
    verify:false,
    showForm:false
  }
  
  export const signInModelSlice = createSlice({
    name: 'model',
    initialState:initialModelState,
    reducers: {
      open:(state)=>({...state,open:true}),
      close:(state)=>({...initialModelState}),
      setMail:(state,action)=>({...state,email:action.payload}),
      setVerify:(state,action)=>({...state,verify:action.payload}),
      setForm:(state,action)=>({...state,showForm:action.payload}),
    },
  })

export const { open,close,setMail,setForm,setVerify } = signInModelSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSong = (state: RootState) => state.model

export default signInModelSlice.reducer