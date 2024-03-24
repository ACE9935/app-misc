import { Song,ISong } from '../../api/models'
import database from '../../api/database'
const mongoose=require('mongoose')

type Data = {
  data:ISong[],
}

export async function GET(
  req:Request,
) {
  const { searchParams } = new URL(req.url)
  let index = searchParams.get('id')
  const genre = searchParams.get('genre')
  const action = searchParams.get('action')

  try{
    database()
    const count = await Song.countDocuments({ genre: { $in: [genre] }});
    const query = { genre: { $in: [genre] } };
    let songs=await Song.find(query)
    let data=[]
    for(let i=0;i<count;i++){
      if(songs[i]._id==index){
        action=="next"?data.push(songs[i+1]):data.push(songs[i-1])
        break
      }
    }
    if(!data[0])  action=="next"?data=[songs[0]]:data=[songs[count-1]]

    return Response.json({ data: data})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}