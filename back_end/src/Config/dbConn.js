import mongoose from 'mongoose';

const dbConn = async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URI);
        
        console.log('Database connected: ', conn.connection.host);
    } catch (error) {
        console.log('Database connection failed: ', error);
    }
}

export default dbConn;