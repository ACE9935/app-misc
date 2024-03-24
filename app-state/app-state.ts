import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from './app-store'
import { ISong } from '@/app/api/models'

// Define a type for the slice state
export interface SongState extends ISong {
  playing: boolean
  paused:boolean
  playingArtistAlbum?:boolean
  playingCustom?:boolean
  customList:ISong[]
  playingPlaylist?:boolean
  playlisGenres?:string[]
  indexOfSongInAlbum?:number|null,
  indexOfSongInPlaylist?:number|null,
  indexOfCustom?:number|null,
}

// Define the initial state using that type
const initialState: SongState = {
  _id:"",
  playing: false,
  customList:[],
  playlisGenres:[],
  playingArtistAlbum:false,
  playingPlaylist:false,
  playingCustom:false,
  indexOfSongInPlaylist:null,
  indexOfSongInAlbum:null,
  paused:false,
  indexOfSong:'0',
  title:null,
  artist:null,
  duration:null,
  album:null,
  image:"",
  audio:null
}

export const nextSong = createAsyncThunk(
  'next/song',
  async function ({ indexS, genre,action }: { indexS: string; genre: string,action:string }, { rejectWithValue }) {
    try {
      const res = await fetch(`/select-song/api?id=${indexS}&genre=${genre}&action=${action}`);

      if (!res.ok) {
        // Handle non-2xx responses here
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data
    } catch (err) {
      console.error('Error in nextSong:', err);

      // Reject with a custom error message or value
      return rejectWithValue('Failed to retrieve the next song');
    }
  }
);

export const nextSongBasedOnArtist = createAsyncThunk(
  'next/song-in-album',
  async function ({ indexS, artist }: { indexS: number; artist: string }, { rejectWithValue }) {
    try {
      const res = await fetch(`/select-song-based-on-artist/api?index=${indexS}&artist=${encodeURIComponent(artist)}`);

      if (!res.ok) {
        // Handle non-2xx responses here
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data
    } catch (err) {
      console.error('Error in nextSong:', err);

      // Reject with a custom error message or value
      return rejectWithValue('Failed to retrieve the next song');
    }
  }
);

export const nextSongBasedOnPlaylist = createAsyncThunk(
  'next/song-in-playlist',
  async function ({ indexS, genre }: { indexS: number; genre: string[] }, { rejectWithValue }) {
    try {
      const res = await fetch(`/select-song-based-on-playlist/api?index=${indexS}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers like Authorization if needed
        },
        body: JSON.stringify({ genres:genre }),
      });

      if (!res.ok) {
        // Handle non-2xx responses here
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data
    } catch (err) {
      console.error('Error in nextSong:', err);

      // Reject with a custom error message or value
      return rejectWithValue('Failed to retrieve the next song');
    }
  }
);

const playStates={
  playing:true,
  playingArtistAlbum:false,
  playingPlaylist:false,
  playingCustom:false,
  customList:[],
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    pause: (state):SongState=>({...state,paused:true}),
    resume: (state):SongState=>({...state,paused:false}),
    setCustom: (state,action):SongState=>({...state,...playStates,playingCustom:true,customList:action.payload}),
    playCustom: (state,action):SongState=>{
      const {songs:songss,index:indexs}=action.payload
      const definiteIndex=indexs<0?songss.length-1:indexs>songss.length-1?0:indexs
      return ({...action.payload.songs[definiteIndex],paused:state.paused,...playStates,playingCustom:true,indexOfCustom:definiteIndex,customList:action.payload.songs})
    },
    play: (state,action):SongState=>({...action.payload,paused:state.paused,...playStates}),
    playAlbum: (state,action):SongState=>({...action.payload,paused:state.paused,...playStates,playingArtistAlbum:true}),
    playPlaylist: (state,action):SongState=>({...action.payload,paused:state.paused,...playStates,playingArtistAlbum:true}),
    stop:state=>initialState
  },
  extraReducers:(builder)=>{
    builder.addCase(nextSong.pending,(state,action)=>{
        return state
    }).addCase(nextSong.fulfilled,(state,action)=>{
       if(action.payload.data.length==0) return initialState
         return {...action.payload.data[0],playing:true}
    }).addCase(nextSong.rejected,(state,action)=>{
        return state
    })
    .addCase(nextSongBasedOnArtist.pending,(state,action)=>{
      return state
  }).addCase(nextSongBasedOnArtist.fulfilled,(state,action)=>{
     if(action.payload.data.length==0) return initialState
     return {...action.payload.data[0],indexOfSongInAlbum:action.payload.index,playing:true,playingArtistAlbum:true}
  }).addCase(nextSongBasedOnArtist.rejected,(state,action)=>{
      return state
  })
  .addCase(nextSongBasedOnPlaylist.pending,(state,action)=>{
    return state
}).addCase(nextSongBasedOnPlaylist.fulfilled,(state,action)=>{
   if(action.payload.data.length==0) return initialState
   return {...action.payload.data[0],indexOfSongInAlbum:action.payload.index,playing:true,playingPlaylist:true,playlisGenres:action.payload.playlistGenre}
}).addCase(nextSongBasedOnPlaylist.rejected,(state,action)=>{
    return state
})
}})


export const { play,stop,pause,resume,playCustom,setCustom } = songSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSong = (state: RootState) => state.song

export default songSlice.reducer