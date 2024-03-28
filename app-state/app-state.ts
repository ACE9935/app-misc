import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from './app-store'
import { ISong } from '@/app/api/models'

function shuffleArray(array:any[]) {
  // Create a copy of the original array to avoid modifying it directly
  const shuffledArray = array.slice();
  
  // Fisher-Yates (Knuth) Shuffle Algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray;
}

function findIndexByField<T>(array: T[], field: keyof T, value: T[keyof T]): number {
  for (let i = 0; i < array.length; i++) {
      if (array[i][field] === value) {
          return i; // Return the index if found
      }
  }
  return -1; // Return -1 if not found
}

// Define a type for the slice state
export interface SongState extends ISong {
  randomSongs:ISong[]
  randomPlay:boolean,
  playing: boolean
  paused:boolean
  playingArtistAlbum?:boolean
  playingCustom?:boolean
  customList:ISong[]
  playingPlaylist?:boolean
  playlisGenres?:string[]
}

// Define the initial state using that type
const initialState: SongState = {
  _id:"",
  randomPlay:false,
  randomSongs:[],
  playing: false,
  customList:[],
  playlisGenres:[],
  playingArtistAlbum:false,
  playingPlaylist:false,
  playingCustom:false,
  paused:false,
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
  randomSongs:[],
  randomPlay:false,
  playing:true,
  playingCustom:false,
  customList:[],
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    pause: (state):SongState=>({...state,paused:true}),
    resume: (state):SongState=>({...state,paused:false}),
    setShuffle: (state,action):SongState=>({...state,randomPlay:action.payload}),
    setCustom: (state,action):SongState=>({...state,...playStates,playingCustom:true,customList:action.payload}),

    playCustom: (state,action):SongState=>{
      const {songs:songss,controlled:controlled,action:actionx,_id:id}=action.payload
      
      let arr=state.randomSongs
      let definiteAbsoluteIndex=findIndexByField(songss,'_id',id)
      definiteAbsoluteIndex=actionx=="next"?definiteAbsoluteIndex+1:actionx=="prev"?definiteAbsoluteIndex-1:definiteAbsoluteIndex
      definiteAbsoluteIndex=definiteAbsoluteIndex<0?songss.length-1:definiteAbsoluteIndex>songss.length-1?0:definiteAbsoluteIndex
      if(JSON.stringify(state.customList) !== JSON.stringify(songss) || !arr || !arr.length) arr=shuffleArray(songss)
          
      if(state.randomPlay && controlled){
      let prevIndexInRandom=findIndexByField(arr,'_id',state._id)
        prevIndexInRandom=actionx=="next"?prevIndexInRandom+1:prevIndexInRandom-1
        const definiteAlternativeIndex=prevIndexInRandom<0?songss.length-1:prevIndexInRandom>songss.length-1?0:prevIndexInRandom
        return ({...arr[definiteAlternativeIndex],paused:state.paused,...playStates,playingCustom:true,randomPlay:true,randomSongs:arr,customList:songss})
      }
      else if(state.randomPlay && arr) return ({...songss[definiteAbsoluteIndex],paused:state.paused,...playStates,playingCustom:true,customList:songss,randomSongs:arr,randomPlay:true})
      else return ({...songss[definiteAbsoluteIndex],paused:state.paused,...playStates,playingCustom:true,customList:songss,randomSongs:arr})
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
         return {...action.payload.data[0],...playStates,playing:true}
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


export const { play,stop,pause,resume,playCustom,setCustom,setShuffle } = songSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSong = (state: RootState) => state.song

export default songSlice.reducer