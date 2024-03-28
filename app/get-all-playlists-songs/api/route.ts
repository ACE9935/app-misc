import { Song} from '../../api/models'
import database from '../../api/database'


export async function POST(
  req:Request
) {
  const {genres} = await req.json()

  try{
    database()
    let songs=await Song.find({genre: { $in: genres }}).sort({title:1})
    return Response.json(songs)
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}