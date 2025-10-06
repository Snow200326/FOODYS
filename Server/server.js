import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './Config/Mongoco.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './Component/ClerkwebHook.js';

const app = express();
const port = process.env.Port || 5000;
await connectDb();
app.use('/api/clerk',clerkWebhooks)
app.use(cors()); // allow all origins
app.use(express.json());
app.use(clerkMiddleware())

app.get("/", (req, res) => {
  res.send("API connected successfully");
});

app.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}/`);
});