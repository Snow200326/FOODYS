// import mongoose from "mongoose";
// import Product from "./Product";

// const orderSchema = mongoose.Schema({
//     userid: { type: String, required: true , ref:"User" },
//     items:[ {
//        product: { type: String, required: true , ref:"Product" },
//        quantity: { type: Number, required: true  },
//        size: { type: String, required: true , ref:"Product" },
    
// }],
// amount: {type:Number, required:true},
// address: {type:String, required:true , ref:"Address"},
// status : {type:String,default:"order placed"},
// paymentMethod:{type:String,required:true},
// ispaid:{type:Boolean , required:true,default:false},
   
// }, {
//     timestamps: true,
// });

// const Order = mongoose.model("Order",orderSchema)
// export default Order;