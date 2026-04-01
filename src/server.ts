import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';
import userRoutes from './routes/userRoutes.js';
import { authLimiter } from './middleware/rateLimiter.middleware.js';
import productRoutes from './routes/productRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(compression());

// LOgging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined')); // better logging for development
}

// connect to MongoDB
await connectDB();

//  connect to Redis
await connectRedis();

// Routes
app.use('/api', authLimiter, authRoutes);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/students', studentRoutes);

//Error handling
app.use(errorHandler);

// start sever

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`),
);
