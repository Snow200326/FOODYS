export const getUserProfile = (req,res) =>{
    try {
        const role = req.user.role;
        // console.log(role)
        const cartData = req.user.cartData
        res.json({success:true,role:role})
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}