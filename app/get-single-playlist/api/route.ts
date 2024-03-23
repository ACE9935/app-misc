import { Playlist } from '../../api/models'
import database from '../../api/database'

export async function GET(
  req:Request
) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')
  try{
    database()
    const result = await Playlist.find({ name: decodeURIComponent(name!) }, { _id: 0 });
    return Response.json(result)
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}