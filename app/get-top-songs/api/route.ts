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
  const limit = searchParams.get('limit')
  try{
    database()
    let songs=await Song.find({top:true}).limit(Number(limit))
    return Response.json({ data: songs})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}