import {v2 as cloudinary} from "cloudinary";
import Product from "../Models/Product.js";
import Product from "../Models/Product.js";
import Product from "../Models/Product.js";
import Product from "../Models/Product.js";

export const creatProduct = async (req,res)=>{
    try {
        const ProductData = JSON.parse(req.body.ProductData)
        const images = req.files
        const imagesUrl = await Promise.all(images.map(async(item)=>{
            const result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
        })
    )
    await Product.create({...ProductData,images:imagesUrl})
    res.json({success:true,message:"Product Created"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}



export const listProduct = async (req,res)=>{
    try {
        const Product = await Product.find({})
        res.json({success:true,message:error.message})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}

export const singleProduct = async (req,res)=>{
    try {
        const {PrducteId} = await req.body;
        const Product = await Product.findById(PrducteId)
        res.json({success:true,message:error.message})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}

export const toggleStock = async (req,res)=>{
    try {
        const {productId,instock} = await req.body
        await Product.findByIdAndUpdate(productId,{instock})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}

// export const listProduct = async (req,res)=>{
//     try {
//         const Product = 

//     } catch (error) {
//         console.log(error.message)
//         res.json({success:false,message:error.message})
        
//     }
// }