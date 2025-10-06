import { Webhook } from "svix";
import { buffer } from "micro";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const payload = (await buffer(req)).toString("utf8");

  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payload, headers);

    console.log("✅ Clerk Webhook Event:", evt.type);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Verification failed:", err.message);
    res.status(400).json({ success: false });
  }
}
