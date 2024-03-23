import { Song,ISong, Playlist } from '../../api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

type Data = {
  data:ISong[],
}

export async function GET(
  req:Request
) {
  try{
    database()
    let playlists=await Playlist.find()
    return Response.json({ data: playlists})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}