import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './Routers/auth.route.js';
import dbConn from './Config/dbConn.js';

console.log(process.env.MONGO_URI);
dbConn();
const app = express();
const port=process.env.PORT;


app.use("/api/auth/",authRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});