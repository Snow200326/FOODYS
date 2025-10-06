import User from "../Models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

           const headers = {
      "svix-id": req.headers[svix-id],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };
    console.log(headers)

        await whook.verify(JSON.stringify(req.body),headers);

        const { data, type } = req.body;
        console.log(data)
        res.send(505).json({data})        

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: 'Webhook not received' });
    }
};

export default clerkWebhooks;
