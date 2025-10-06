import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import { Webhook } from "svix";
import connectDb from "./Config/Mongoco.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./Component/ClerkwebHook.js";

const port = process.env.Port || 5000;
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY;

const startServer = async () => {
  await connectDb();
  const app = express();

  // ✅ CORS middleware
  app.use(cors());

  // ✅ Clerk middleware (for auth-protected routes)
  app.use(clerkMiddleware());

  // ✅ IMPORTANT: Raw parser ONLY for webhook route (before express.json)
  app.post(
    "/clerk/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      try {
        // ✅ Verify environment secret exists
        if (!WEBHOOK_SECRET) {
          throw new Error("Missing Clerk Webhook Secret in .env file");
        }

        // ✅ Convert Buffer payload to string (Svix requires exact bytes)
        const payload = req.body.toString("utf8");

        // ✅ Extract Svix headers
        const headers = {
          "svix-id": req.headers["svix-id"],
          "svix-timestamp": req.headers["svix-timestamp"],
          "svix-signature": req.headers["svix-signature"],
        };

        // ✅ Verify webhook signature
        const wh = new Webhook(WEBHOOK_SECRET);
        const evt = wh.verify(payload, headers);

        // ✅ Log & handle event
        const { data, type } = evt;
        console.log(`🟢 Clerk Webhook Received: ${type}`);

        switch (type) {
          case "user.created":
            console.log("✅ New user created:", data.id);
            // You can also call your clerkWebhooks controller here:
            // await clerkWebhooks(evt);
            break;

          case "user.updated":
            console.log("🟡 User updated:", data.id);
            break;

          case "user.deleted":
            console.log("🔴 User deleted:", data.id);
            break;

          default:
            console.log("⚪ Unhandled webhook event:", type);
        }

        res.status(200).json({ success: true });
      } catch (err) {
        console.error("❌ Webhook verification failed:", err.message);
        res.status(400).json({ success: false, message: err.message });
      }
    }
  );

  // ✅ Regular middleware AFTER webhook route
  app.use(express.json());

  // ✅ Example route
  app.get("/", (req, res) => {
    res.send("🚀 API connected successfully");
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();
