import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './Routers/auth.route.js';
import msgRoutes from './Routers/msg.route.js';
import dbConn from './Config/dbConn.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './Lib/socket.js';
import path from 'path';
console.log(process.env.MONGO_URI);
dbConn();
//const app = express();
const port=process.env.PORT || 5001;
const __dirname = path.resolve();
//this above is used to get the current directory name

app.use(express.json({ limit: '10mb' }));//use to parse json data
//  can send images/media of size 10mb
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,////to allow credentials such as cookies to be sent with requests

}));//to allow cross-origin requests and send cookies with requests

app.use("/api/auth/",authRoutes);
app.use("/api/msg/",msgRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../front_end/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front_end/build', "dist", 'index.html'));
    //apart from api/auth and api/msg all the requests will be handled by this
    //this will show the index.html file of the front_end/build folder
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
