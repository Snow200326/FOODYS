import express from 'express';
import cors from 'cors';
import "dotenv/config"
import connectDb from './Config/Mongoco.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './Component/ClerkwebHook.js';
import userRouter from './Routes/userRoute.js';
import connectCloudinary from './Config/Colud.js';
import productRouter from './Routes/ProductRoute.js';
import AddressRoute from './Routes/Address.Route.js';
import CartRouter from './Routes/CartRoute.js';

const port = 5000;
await connectDb();
await connectCloudinary();

const app = express()
app.use(cors());


app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/clerk',clerkWebhooks)
// app.use('/api/user',userRouter)
// app.use("/api/products",productRouter)
// app.use("/api/addresses",AddressRoute)
// app.use("/api/Cart",CartRouter)


app.get('/',(req,res)=>{
    res.send("Api successfully connectedeeeeee")
})


app.listen(port, () => {
  console.log(`🌐 Server running at http://localhost:${port}`);
});