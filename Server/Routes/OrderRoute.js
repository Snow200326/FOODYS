import express from 'express';
import autUser from '../Middleware/authMiddleware.js';
import { OrderPlaceCod,OrderPlaceStrip,allOrder,userOrder,updateStatus } from '../Component/OrderController.js';

const OrderRoute = express.Router();

OrderRoute.get("/",autUser,allOrder)
OrderRoute.post("/status",autUser,updateStatus)
OrderRoute.post("/cod",autUser,OrderPlaceCod)
OrderRoute.post("/strip",autUser,OrderPlaceStrip)
OrderRoute.post("/userOrder",autUser,userOrder)

export default OrderRoute;

