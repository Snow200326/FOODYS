// import { useId } from "react"
import User from "../Models/user.js"


export const autUser = async(req,res,next) =>{
    try {
        const{userId}=req.auth()
        if(!userId)
        {
            return res.json({success:false,message:"not Authorized"})
        }
        let user = await User.findById(userId)
        if(!user){
            return req.json({success:false,message:"Not Authorized"})
        }
        const ownerEmail = process.env.ADMIN_EMAIL
        const newRole = ownerEmail && user.email === ownerEmail ? "owner":"user"
        if(user.role !== newRole){
            user= await User.findByIdAndUpdate(userId,{role:newRole},{new:true});
        }
        req.user = user
        next()
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Not Authorized"})
        
    }
}
export default autUser;