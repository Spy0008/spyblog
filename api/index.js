import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './route/user.route.js'
import authRoutes from './route/authRoute.js'
import cookieParser from 'cookie-parser';

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

app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server running on 3000")
})

app.use('/api/user', userRoutes);
app.use('/api/auth/', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})