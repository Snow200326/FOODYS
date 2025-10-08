export const getUserProfile = (req,res) =>{
    try {
        const role = req.users.role;
        const cartData = req.users.cartData
        res.JSON({success:true,role:cartData})
        
    } catch (error) {
        res.JSON({success:false,message:error.message})
        
    }
}