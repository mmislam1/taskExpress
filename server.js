import express from "express";
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';
import path from 'path';
import fileRouter from "./Routers/fileRouter.js";

dotenv.config();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const conn = ''

mongoose.connect(conn)



app.get('/', (req, res) => {
    res.send('hi')
})
app.use('/api/users', userRouter)
app.use('/api/upload', fileRouter)





const port = 5000

app.listen(port, () => { console.log(`Serving at localhost:${port}`) })