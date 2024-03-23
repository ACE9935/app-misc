import { Appuser } from '../../api/models'
import database from '../../api/database'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export async function POST(
  req:Request
) {
  const {id,userId,song,action} = await req.json()
  const idx = new ObjectId(id)
  try{
    database()
    if(action=="add")await Appuser.updateOne(
        { _id: userId, 'info.playlists._id': idx },
        {
          $push: {
            'info.playlists.$.songs': song,
          },
        },// Return the updated document
      );
      if(action=="remove")await Appuser.updateOne(
        { _id: userId, 'info.playlists._id': idx },
        {
          $pull: {
            'info.playlists.$.songs': {title:song.title},
          },
        }, // Return the updated document
      );
    return Response.json({ data: "Success"})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}