import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './Config/Mongoco.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './Component/ClerkwebHook.js';

const app = express();
const port = process.env.Port || 5000;
app.use(cors()); // allow all origins
app.use(clerkMiddleware())
app.use('/api/clerk',clerkWebhooks)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API connected successfully");
});
await connectDb();

app.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}/`);
});