import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';            // ✅ Explicit import
dotenv.config();                        // ✅ Properly load .env

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import bookRouter from './routes/bookRoute.js';
import borrowingRouter from './routes/borrowingRoute.js';
import addressRouter from './routes/addressRoute.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// CORS setup
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// CORS debugging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - Origin: ${req.get('origin')}`);
  next();
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200
}));

// Routes
app.get('/', (req, res) => res.send("Library Management System API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/book', bookRouter);
app.use('/api/borrowing', borrowingRouter);
app.use('/api/address', addressRouter);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
