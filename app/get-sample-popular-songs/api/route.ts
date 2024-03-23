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
    const songs = await Song.aggregate([
      { $match: { popular: true } }, // Match documents where popular is true
      { $sample: { size: 25 } } // Retrieve random documents
    ]);
    return Response.json({ data: songs})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}