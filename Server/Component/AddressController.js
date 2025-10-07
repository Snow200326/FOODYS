import Address from "../Models/address.js"


export const addAddress = async (req,res)=>{
    try {
        const{address} = req.body
        const {userId} = req.auth()
        await Address.create({...address,userId})
        
        res.json({success:true,message:"Address add Successfully"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}

export const getAddress = async (req,res)=>{
    try {
         const{userId} = req.body
       const address = await Address.find({userId}).sort({createdAt: -1})
        
        res.json({success:true,message:"Stock Updated"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}