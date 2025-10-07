import Order from "../Models/Order.js";
import Product from "../Models/Product.js";
import User from "../Models/user.js";
import Stripe from "stripe";


const currency = "usd";
const delivery_charge = 10;
const taxpercentage = 0.02;
export const OrderPlaceCod = async (req,res)=>{
    try {
        const {items,address}= req.body
        const{userId}=req.auth()
        if(!items || items.length === 0)
        {
            return res.json({success:false,message:"please add  product first"})
        }

        let subtotal = 0 ;
        for(const item in items){
            const product = await Product.findById(item.product)
            if(!product){
                 return res.json({success:false,message:"Products not added"})
            }
            const unitPrice = product.price[item.size]
            if(!unitPrice){
                return res.json({success:false,message:"Invalid size selected"})
            }
                res.json({success:true,message:"Added to Cart"})
                subtotal += unitPrice + item.quantity
        }
        const taxAmount = subtotal * taxpercentage
        const totalAmount = subtotal + taxAmount + delivery_charge
        const order = await Order.create({
            userId,
            items,
            amont:totalAmount,
            address,
            Paymentmethod:"cod"
        })
        await User.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order placed"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}
//strip

export const OrderPlaceStrip = async (req,res)=>{
    try {
       
        res.json({success:true,message:"Order placed"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}
// for the user 
export const userOrder = async (req,res)=>{
    try {
        const {userId}=req.auth()
        const order = await Order.find({userId, $or:[{Paymentmethod:'COD'},{ispaid:true}]}).populate("items.product address").sort({createdAt : -1})

        res.json({success:true,message:order})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}

// for admin
export const allOrder = async (req,res)=>{
    try {
        const order = await Order.find({$or:[{Paymentmethod:'COD'},{ispaid:true}]}).populate("items.product address").sort({createdAt : -1});
        const totalOrder = order.length
        const totalRevenu = order.reduce((acc,o)=>{
            acc + (o.ispaid ? o.amount : 0)

        },0)

        res.json({success:true,dashboardData:(totalAmount,totalOrder,order)})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}
// for status /status
export const updateStatus = async (req,res)=>{
    try {
        const {orderid, status} = req.body
        await Order.findByIdAndUpdate(orderid,{status})
       
        res.json({success:true,message:"Order status Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}