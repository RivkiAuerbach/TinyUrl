
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    password: String,
    links: []
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
