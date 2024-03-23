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
  let index = searchParams.get('index')
  let artist = searchParams.get('artist')
  artist=decodeURIComponent(artist!)
  try{
    database()

    const count = await Song.countDocuments({ artistName: artist});
 
    if(Number(index)+1>count) index="0"
    if(Number(index)<0) index=String(count-1)

    let songs=await Song.find({ artistName: artist},'-_id').skip(Number(index)).limit(1)

    return Response.json({ data: songs,index:Number(index)})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}