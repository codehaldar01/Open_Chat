import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './Routers/auth.route.js';
import msgRoutes from './Routers/msg.route.js';
import dbConn from './Config/dbConn.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './Lib/socket.js';

console.log(process.env.MONGO_URI);
dbConn();
//const app = express();
const port=process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,////to allow credentials such as cookies to be sent with requests

}));//to allow cross-origin requests and send cookies with requests

app.use("/api/auth/",authRoutes);
app.use("/api/msg/",msgRoutes);


server.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
