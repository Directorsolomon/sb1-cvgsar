import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/civiceye-ng');

// ... (keep the rest of the server code unchanged)

app.listen(PORT, () => {
  console.log(`CivicEye.ng server is running on port ${PORT}`);
});