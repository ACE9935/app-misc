import { Artist, ISongPlaylist, Playlist } from '../../api/models'
import database from '../../api/database'

export async function GET(
  req:Request
) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')
  const data=[]
  try{
    database()
    let artist = await Artist.find({ name: decodeURIComponent(name!) }, { _id: 0 });
    const finalResult = artist.map(doc => doc.toObject());
    let playlistsRaw = await Playlist.find({ genres: { $in: finalResult[0].genre } }, { _id: 0 });
    const playlists: ISongPlaylist[] = playlistsRaw.map(doc => doc.toObject());
    data.push({ artist: finalResult[0], playlists: playlists });
    return Response.json({ data: data})
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}