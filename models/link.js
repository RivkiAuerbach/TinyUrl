import mongoose from "mongoose";

const  linkSchema=new mongoose.Schema({
    _id: Number,
    originalUrl: String
})
const linkModel=mongoose.model("link",linkSchema);
export default linkModel;