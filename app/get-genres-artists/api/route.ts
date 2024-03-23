import { Artist, ISongPlaylist, Playlist } from '../../api/models'
import database from '../../api/database'

const limit=20

export async function GET(
  req:Request
) {
    const { searchParams } = new URL(req.url)
    const genre = searchParams.get('genre')
    const key = searchParams.get('key')
  try{
    database()
    const artists = await Artist.find({ genre: { $elemMatch: { $eq: decodeURIComponent(genre!) } } },{_id:0}).limit(limit).skip(limit*(Number(key)-1))
    const numberofPagesOfGenre=await Artist.countDocuments({ genre: { $elemMatch: { $eq: genre } } },{_id:0})
    return Response.json({genre:genre,artists:artists,numberofPagesOfGenre:numberofPagesOfGenre})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}