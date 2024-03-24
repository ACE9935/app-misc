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
  const limit=9
  try{
    database()
    let songs=await Song.find({popular:true}).sort({ title: 1 }).limit(limit).skip((Number(page)-1)*limit)
    const count = await Song.countDocuments({popular:true});
    return Response.json({ data: songs,pageLength:Math.ceil(count/limit)})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}