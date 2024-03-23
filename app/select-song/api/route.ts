import { Song,ISong } from '../../api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

type Data = {
  data:ISong[],
}

export async function GET(
  req:Request,
) {
  const { searchParams } = new URL(req.url)
  let index = searchParams.get('index')
  const genre = searchParams.get('genre')
  try{
    database()
    const count = await Song.countDocuments({ genre: { $in: [genre] }});
    if(Number(index)>count) index="1"
    if(Number(index)==0) index=String(count)
    const query = { indexOfSong: String(index), genre: { $in: [genre] } };
    let songs=await Song.find(query,'-_id')
    return Response.json({ data: songs})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}