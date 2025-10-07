import express from "express"
import { upload } from "../Middleware/multer.js"
import autUser  from "../Middleware/authMiddleware.js"
import { creatProduct,listProduct,singleProduct,toggleStock } from "../Component/ProductController.js"

const productRouter = express.Router()

productRouter.post("/",upload.array("image",4),autUser,creatProduct)
productRouter.get("/",listProduct)
productRouter.post("/single",singleProduct)
productRouter.post("/toggle-stock",autUser,toggleStock)

export default productRouter;

