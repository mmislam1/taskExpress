import express from "express";
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';
import path from 'path';

dotenv.config();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const conn = ''

mongoose.connect(conn)




app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('hi')
})



const port = process.env.PORT || 5000

app.listen(port, () => { console.log(`Serving at localhost:${port}`) })