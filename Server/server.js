import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './Config/Mongoco.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './Component/ClerkwebHook.js';

const app = express();
const port = process.env.Port || 5000;

// Connect to MongoDB
await connectDb();

// Allow all origins
app.use(cors());

// Clerk middleware for authenticated routes
app.use(clerkMiddleware());

// Parse JSON for regular routes
app.use(express.json());

// Webhook route (must use raw body inside clerkWebhooks)
app.use('/api/clerk', clerkWebhooks);

// Test route
app.get("/", (req, res) => {
  res.send("API connected successfully");
});

// Start server (don't bind to 'localhost' in production)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
