import { Artist, ISongPlaylist, Playlist } from '../../api/models'
import database from '../../api/database'

export async function GET(
  req:Request
) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')
  try{
    database()
    const artistInPage=await Artist.find({name:decodeURIComponent(name!)})
    const docs = await Artist.find({ genre: { $in: artistInPage[0].genre[0] } },{_id:0}).limit(7);
    return Response.json(docs)
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}