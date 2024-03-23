import mongoose from 'mongoose';

const uri=process.env.MONGODB_URI!

async function database() {
     return await mongoose.connect(uri)
    .then(()=>console.log('Connected to database'))
    .catch(()=>console.log('Error connecting to DB'))
}

export default database