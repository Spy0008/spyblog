import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './route/user.route.js'
import authRoutes from './route/authRoute.js'

dotenv.config();

mongoose
    .connect(
        process.env.MONGO
    ).then(
        () => { console.log("MongoDB database connected") }
    ).catch(err => {
        console.log(err);
    })

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on 3000")
})

app.use('/api/user', userRoutes);
app.use('/api/auth/', authRoutes)