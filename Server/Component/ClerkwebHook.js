import User from "../Models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY)
        const header = {
            "svix-id": req.header["svix-id"],
            "svix-timestapms": req.header["svix-timestapms"],
            "svix-sgnature": req.header["svix-signature"]
        }
        await whook.verify(JSON.stringify(req.body), header)

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email[0].email_address,
                    username: data.first_name + '' + data.last_name,
                    image: data.image_url,
                }
                await User.create(userData)
                break;
            }
                
            case "user.updated": {
                const userData = {
                    _id: data.id,
                    email: data.email[0].email_address,
                    username: data.first_name + '' + data.last_name,
                    image: data.image_url,
                }
                await User.create(userData)
                break;
            }
               
            case "user.delete": {

                await User.findByIdAndDelete(data.id, userData)
                break;
            }
            
            default:
                break;


            }
            res.json({ success: true, message: "webhook Received" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: 'Webhook not reveived' })

    }
}

export default clerkWebhooks;