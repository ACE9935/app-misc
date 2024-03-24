import { Artist, ArtistInterface, ISong, Playlist, Song } from '../../api/models'
import database from '../../api/database'

export async function GET(
  req:Request
) {
    const { searchParams } = new URL(req.url)
    const term = searchParams.get('term')
    const data=[]
  try{
    database()
      // Retrieve songs randomly
      const songs = await Song.aggregate([
        { $match: {
          $or: [
            { title: { $regex: new RegExp(term!, 'i') } },
            { artistName: { $regex: new RegExp(term!, 'i') } },
            { album: { $regex: new RegExp(term!, 'i') } },
            { genre: { $elemMatch: { $regex: new RegExp(term!, 'i') } } }
          ]
        }},
        { $sort: { popular: -1 } },
        { $sample: { size: 5 } }, // Sample 5 random documents Exclude the _id field from the result
      ]);
  
      // Retrieve artists randomly
      const artists = await Artist.aggregate([
        { $match: {
          $or: [
            { name: { $regex: new RegExp(term!, 'i') } },
            { genre: { $elemMatch: { $regex: new RegExp(term!, 'i') } } }
          ]
        }},
        { $sort: { top: -1 } },
        { $sample: { size: 7 } }, // Sample 7 random documents
        { $project: { _id: 0 } } // Exclude the _id field from the result
      ]);
  
      const regexArray = [new RegExp(term!, 'i')];
      artists.forEach((o: ArtistInterface) => o.genre.forEach((p: string) => regexArray.push(new RegExp(p, 'i'))));
      songs.forEach((o: ISong) => o.genre!.forEach((p: string) => regexArray.push(new RegExp(p, 'i'))));
      const genreMatchConditions = regexArray.map(regex => ({ genres: { $elemMatch: { $regex: new RegExp(regex, 'i') } } }));
  
      const playlists = await Playlist.aggregate([
        { $match: {
          $or: [
            { name: { $regex: new RegExp(term!, 'i') } },
            { $or: genreMatchConditions }
          ]
        }},
        { $sample: { size: 3 } }, // Sample 3 random documents
        { $project: { _id: 0 } } // Exclude the _id field from the result
      ]);
  
      // Push the randomly retrieved documents to the data array
      data.push({
        artists: artists,
        songs: songs,
        playlists: playlists
      });
  
    return Response.json(data)
  }
  catch (e:unknown){
    console.log({error:e})
    return Response.json({error:e})
}
}