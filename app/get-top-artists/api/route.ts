
import { Artist } from '@/app/api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

export async function GET(
  req:Request
) {
  const { searchParams } = new URL(req.url)
  const artistName = searchParams.get('artist')
  const limit = searchParams.get('limit')
  try{
    database()
    let artists=await Artist.find({top:true}).limit(Number(limit))
    return Response.json({ data: artists})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}