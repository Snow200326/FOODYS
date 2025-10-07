import mongoose from "mongoose";


const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.mongoUri}/Foodie`)
        console.log("Connected Successfully")

    } catch (error) {
        console.log(" not Connected Successfully")

    }
}
export default connectDb;