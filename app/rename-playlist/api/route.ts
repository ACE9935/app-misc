import { Appuser } from '../../api/models'
import database from '../../api/database'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export async function POST(
  req:Request
) {
  const {id,userId,name} = await req.json()
  const idx = new ObjectId(id)

  try{
    database()
     await Appuser.updateOne(
        { _id: userId, 'info.playlists._id': idx },
        {
          $set: { 'info.playlists.$.name': name }
          },

      );
    return Response.json({ data: "Success"})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}