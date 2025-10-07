import express from 'express';
import autUser from '../Middleware/authMiddleware.js';
import { addAddress, getAddress } from '../Component/AddressController.js';

const AddressRoute = express.Router();

AddressRoute.post("/add",autUser,addAddress)
AddressRoute.get("/",autUser,getAddress)

export default AddressRoute;

