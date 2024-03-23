import { Song,ISong, Playlist, Artist } from '../../api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

  // Note: Replace the placeholder values with the actual URLs for images and audio.
  

  export async function GET(
    req:Request
  ) {

    try{
      database()
      const genresToAdd = ['Hip-Hop', 'Rock', 'Pop', 'EDM', 'Jazz'];
       
      

      return Response.json({ data: "DATABASE UPDATED"})
    }
    catch (e:unknown){
      console.log({error:e})
      return Response.json({error:e})
  }
  }