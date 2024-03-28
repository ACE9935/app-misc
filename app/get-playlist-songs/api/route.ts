import { Song} from '../../api/models'
import database from '../../api/database'


export async function POST(
  req:Request
) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const {genres} = await req.json()

  const limit=5
  try{
    database()
    let songs=await Song.find({genre: { $in: genres }}).sort({ title: 1 }).limit(limit).skip((Number(page)-1)*limit)
    const plainObjects = songs.map(doc => doc.toObject());
    const count = await Song.countDocuments({genre: { $in: genres }});
    return Response.json({ data: plainObjects,pageLength:Math.ceil(count/limit)})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}