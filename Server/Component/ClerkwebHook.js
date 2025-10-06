import User from "../Models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-signature": req.headers["svix-signature"],
            "svix-timestamp": req.headers["svix-timestamp"],
        };
            const payload = req.body.toString("utf8");
            const evt = whook.verify(payload, headers);

      

        const { data, type } = evt ;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + ' ' + data.last_name,
                    image: data.image_url,
                };
                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, {
                    email: data.email_addresses[0].email_address||"no-email@example.com",
                    username: data.first_name + ' ' + data.last_name,
                    image: data.image_url,
                });
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                console.log("Unhandled webhook type:", type);
        }

        res.status(200).json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: 'Webhook not received' });
    }
};

export default clerkWebhooks;
