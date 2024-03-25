import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
const dbName = 'your_database_name'; // Your database name

// Function to establish a connection to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log('Connected to MongoDB');

    // Select your database
    const db = client.db("MyDB");

    return db; // Return the database instance
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error
  }
}

export default connectToDatabase;