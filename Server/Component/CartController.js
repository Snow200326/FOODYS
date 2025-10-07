import User from "../Models/user.js";

export const AddToCart = async (req,res)=>{
    try {
         const{itemId,size} = req.body
        const {userId}  = req.auth()
        
        const userData = await User.findById(userId)
        const cartData = await userData.cartData ||{}

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            }else{
                cartData[itemId][size] =1;
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size] = 1
        }
        await User.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to Cart"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}


export const UpdateToCart = async (req,res)=>{
    try {
        const{itemId,size,quantity} = req.body
        const {userId} = req.auth()
        const userData = await User.findById(userId)
        const cartData = await userData.cartData ||{}
        if(quantity <=0 )
        {
            delete cartData[itemId][size]
            if(Object.entries(cartData[itemId]).length === 0){
                delete cartData[itemId]
            }
        }else{
            cartData[itemId] = cartData[itemId] ||  {}
            cartData[itemId] = quantity
        }
        
        await User.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"updated to Cart"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}