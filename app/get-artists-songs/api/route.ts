import { Song,ISong } from '../../api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

type Data = {
  data:ISong[],
}

export async function GET(
  req:Request
) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  let artist = searchParams.get('artist')
  artist=decodeURIComponent(artist!)
  const limit=5
  try{
    database()
    let songs=await Song.find({artistName:artist}).limit(limit).skip((Number(page)-1)*limit)
    const count = await Song.countDocuments({artistName:artist});
    return Response.json({ data: songs,pageLength:Math.ceil(count/limit)})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}