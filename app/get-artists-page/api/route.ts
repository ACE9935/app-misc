
import { Artist } from '../../api/models';
import database from '../../api/database';

export async function GET(req: Request): Promise<Response> {
  try {
    await database();

    const genres=["Hip-Hop","Pop","Rock","Jazz","EDM"]
    const data = [];

    // Iterate over each genre in the provided genres array
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        
        // Use the Mongoose find method to find artists with the current genre
        const artists = await Artist.find({ genre: { $elemMatch: { $eq: genre } } }).limit(7);

        // Add the artists to the data array
        data.push({ genre: genre, artists: artists });
    }

    return Response.json({ data: data });
  } catch (error: unknown) {
    console.error({ error });
    return Response.json({ error });
  }
}
