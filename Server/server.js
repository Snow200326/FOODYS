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

  app.use("/api/clerk", clerkWebhooks);

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
