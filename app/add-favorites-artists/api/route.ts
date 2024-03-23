import { Appuser } from '../../api/models'
import database from '../../api/database'

export async function POST(
  req:Request
) {
  const {userId,artist,action} = await req.json()

  try{
    database()
    if(action=="add"){
        await Appuser.updateOne(
        { _id: userId },
        { $push: { 'info.favoriteArtists': artist } },
    )}
    else if(action=="remove"){
        await Appuser.updateOne(
        { _id: userId },
        { $pull: { 'info.favoriteArtists': {name:artist.name} } },
    )}
    return Response.json({ data: "Success"})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}