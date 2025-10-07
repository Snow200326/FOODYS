import express from 'express';
import cors from 'cors';
import "dotenv/config"
import connectDb from './Config/Mongoco.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './Component/ClerkwebHook.js';

const port = 5000;
await connectDb();

const app = express()
app.use(cors());


app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/clerk',clerkWebhooks)

app.get('/',(req,res)=>{
    res.send("Api successfully connectedeeeeee")
})


app.listen(port, () => {
  console.log(`🌐 Server running at http://localhost:${port}`);
});