import { Appuser } from '../../api/models'
import database from '../../api/database'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export async function POST(
  req:Request
) {
  const {userId} = await req.json()
  const idx = new ObjectId(userId)
  try{
    database()
    await Appuser.deleteOne({_id:idx})
    return Response.json({ data: "Success"})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}