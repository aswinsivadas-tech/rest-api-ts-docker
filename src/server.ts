import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';

dotenv.config();

const app = express();

// connect to MongoDB
await connectDB();

//  connect to Redis
await connectRedis();

// start sever

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`),
);