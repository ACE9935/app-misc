import { Appuser } from '../../api/models'
import database from '../../api/database'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export async function POST(
  req:Request
) {
  const {userId,name,song} = await req.json()

  try{
    database()
    console.log("Creating playlist...")
    await Appuser.updateOne(
        { _id: userId,},
        {
          $push: {
            'info.playlists': {_id:new ObjectId(),name:name,songs:[song]},
          },
        },
        { new: true } // Return the updated document
      );
    return Response.json({ data: "Success"})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}