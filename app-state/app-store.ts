import { configureStore } from '@reduxjs/toolkit'
import songReducer from './app-state'
import signInModelSlice  from './model-state'
import addPlaylistModel from './playlist-model'
import deletePlaylist from './delete-playlist-model'
import editPlaylist from './rename-playlist-model'
import searchModel from './search-model'
import deleteAccount from './delete-account'
import editUserName from './edit-user-name'

export const store = configureStore({
  reducer: {
    song:songReducer,
    model:signInModelSlice,
    addPlaylist:addPlaylistModel,
    deletePlaylist:deletePlaylist,
    editPlaylist:editPlaylist,
    search:searchModel,
    deleteUser:deleteAccount,
    editUserName:editUserName
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch