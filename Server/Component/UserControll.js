export const getUserProfile = (req,res) =>{
    try {
        const role = req.user.role;
        const cartData = req.user.cartData
        res.JSON({success:true,role:cartData})
        
    } catch (error) {
        res.JSON({success:false,message:error.message})
        
    }
}