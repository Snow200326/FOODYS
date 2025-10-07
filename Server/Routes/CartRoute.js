import express from "express"

import autUser from "./Middleware/authMiddleware.js"
import { AddToCart, UpdateToCart } from "../Component/CartController.js"

const CartRouter = express.Router()

CartRouter.post('/add',autUser,AddToCart)
CartRouter.get("/",autUser,UpdateToCart)

export default CartRouter