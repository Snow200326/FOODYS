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

  
  app.use(express.json());
  app.use(clerkMiddleware());
  
 app.post("/clerk/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        return res.status(400).json({});
    }

    // Handle the webhook
    const { id } = msg.data;
    const eventType = msg.type;

    console.log(`User ${id} was ${eventType}`);

    res.json({ success: true });
});
  app.get("/", (req, res) => {
    res.send("API connected successfully");
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer();
