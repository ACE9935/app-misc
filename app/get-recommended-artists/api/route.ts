import { Artist, Playlist } from '../../api/models'
import database from '../../api/database'

export async function GET(
  req:Request
) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')
  try{
    database()
    const artistInPage=await Playlist.find({name:decodeURIComponent(name!)})
    const docs = await Artist.find({ genre: { $in: artistInPage[0].genres } },{_id:0}).limit(7);
    return Response.json(docs)
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}