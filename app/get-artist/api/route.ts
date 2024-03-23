import { Song,ISong, Playlist, Artist } from '../../api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

type Data = {
  data:ISong[],
}

export async function GET(
  req:Request
) {
  const { searchParams } = new URL(req.url)
  const artistName = searchParams.get('artist')
  try{
    database()
    let artist=await Artist.find({name:decodeURIComponent(artistName!)})
    return Response.json({ data: artist})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}