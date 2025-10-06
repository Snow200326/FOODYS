import User from "../Models/user.js";
import { Webhook } from "svix";
import express from "express";

const router = express.Router();

// Use express.raw() middleware for this route
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

    const headers = {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
    };

    try {
        // Verify the webhook (req.body is raw here)
        const evt = whook.verify(req.body, headers);

        const { data, type } = evt; // use verified event

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    username: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };
                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findOneAndUpdate(
                    { clerkId: data.id },
                    {
                        email: data.email_addresses[0].email_address,
                        username: `${data.first_name} ${data.last_name}`,
                        image: data.image_url,
                    }
                );
                break;
            }

            case "user.deleted": {
                await User.findOneAndDelete({ clerkId: data.id });
                break;
            }

            default:
                console.log("Unhandled webhook type:", type);
        }

        res.status(200).json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("Webhook verification failed:", error.message);
        res.status(400).json({ success: false, message: "Webhook not received" });
    }
});

export default router;
