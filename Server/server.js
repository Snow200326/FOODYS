import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './Config/Mongoco.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './Component/ClerkwebHook.js';

const port = process.env.Port || 5000;

const startServer = async () => {
  await connectDb();
  const app = express();

  app.use(cors());

  // 👇 Webhook FIRST (raw body)
  app.use("/api/clerk", clerkWebhooks);

  // 👇 Then JSON middleware for rest of routes
  app.use(express.json());
  app.use(clerkMiddleware());

  app.get("/", (req, res) => {
    res.send("API connected successfully");
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer();
