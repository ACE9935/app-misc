import { Appuser, User } from '../../api/models'; // Assuming Appuser is a Mongoose model
import { getServerSession } from "next-auth/next";
import mongoose from 'mongoose';
import { authOptions } from '@/app/api/authOptions';
import connectToDatabase from '@/mongo/connectDB';
import database from '@/app/api/database';

const ObjectId = mongoose.Types.ObjectId;

export async function POST(
  req: any,
  res: any
) {
  const { userId } = await req.json();
  const idx = new ObjectId(userId);

  try {
    database()
    const session:any = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' });
    }
    
    const userIdx = session?.user?.id;
    console.log(userIdx)
 
    // Delete user from MongoDB collection
    const result = await User.deleteOne({ _id: userIdx });
    console.log("MongoDB User Deletion Result:", result);

    // Delete user from Mongoose model
    await Appuser.deleteOne({ _id: idx });
    console.log("Mongoose User Deletion Done");

    return Response.json({ data: "Success" });
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}
