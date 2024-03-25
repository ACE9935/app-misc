import mongoose, { Schema, model } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
export interface ISong {
  _id:string;
  title: string | null;
  artist:string | null;
  artistName?:string|null
  duration:string | null;
  image:string
  audio:string|null
  top?:boolean
  album?:string|null
  genre?:string[]| null
  indexOfSong?:string|Number;
  popular?:boolean
}

export interface NextUser {
  _id:string;
  name:string
  email:string
  image:string
}

const nextUserSchema = new Schema<NextUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const songSchema = new Schema<ISong>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: true },
  artist: { type: String, required: true },
  artistName: { type: String, required:true },
  duration: { type: String, required: true },
  top: { type: Boolean,default:false },
  popular: { type: Boolean,default:false },
  album: { type: String },
  genre:{type:[String]},
  indexOfSong: { type: String||Number}
});

interface userInfo {
  favorites:ISong[]
  playlists:{_id:string,name:string,songs:ISong[]}[]
  favoriteArtists:ArtistInterface[]
}
export interface userPlaylist{_id:string,name:string,songs:ISong[]}[]
export interface UserType {
    _id:any
    name:string
    email:string
    image:string
    access:'allowed' | 'unallowed' | 'pending',
    info?:userInfo
  }

  // 2. Create a Schema corresponding to the document interface.
  const userSchema = new Schema<UserType>({
    name: { type: String,
    default: function () {
      // 'this' refers to the document being created
      return this._id.toString();
    },
    required: [true,'Please enter your first name']},
    email: { type: String, required: [true,'Please enter an email'],
     unique:true,
},
   image:{type:String,default:"/user.png"},
    access:{type:String, default:'allowed'},
    info:{type:Object, default:
    {favorites:[],
    playlists:[],
    favoriteArtists:[]
    }
    },
  })

  export interface ISongPlaylist {
    name: string | null;
    genres:string[]
    description:string | null;
    image:string
  }
  
  // 2. Create a Schema corresponding to the document interface.
  const songPlaylistSchema = new Schema<ISongPlaylist>({
    name: { type: String, required: true },
    genres:{type:[String],required:true},
    image: { type: String, required: true },
    description: { type: String, required: true },
  });

  
  export interface ArtistInterface {
    name: string;
    genre:string[]
    description:string;
    image:string
    top?:boolean
  }
  
  // 2. Create a Schema corresponding to the document interface.
  const artistSchema= new Schema<ArtistInterface>({
    name: { type: String, required: true },
    genre: { type: [String], required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    top: { type: Boolean },
  });

  // 3. Create a Model.
export const Appuser =mongoose.models.appuser || model<UserType>('appuser', userSchema);
export const Song =mongoose.models.song || model<ISong>('song', songSchema);
export const Artist =mongoose.models.artist || model<ArtistInterface>('artist', artistSchema);
export const Playlist =mongoose.models.playlist || model<ISongPlaylist>('playlist', songPlaylistSchema);
export const User =mongoose.models.user || model<NextUser>('user', nextUserSchema);