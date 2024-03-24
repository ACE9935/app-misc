import { Song } from '../../api/models'
import database from '../../api/database'

export async function POST(
  req:Request
) {
  const { searchParams } = new URL(req.url)
  let index = searchParams.get('index')
  const {genres} = await req.json()
  try{
    database()
    const count = await Song.countDocuments({genre: { $in: genres }});
 
    if(Number(index)+1>count) index="0"
    if(Number(index)<0) index=String(count-1)

    let songs=await Song.find({genre: { $in: genres }},'-_id').sort({ title: 1 }).skip(Number(index)).limit(1)
    return Response.json({ data: songs,index:Number(index),playlistGenre:genres})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}