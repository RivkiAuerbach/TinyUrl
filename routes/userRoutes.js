// import { Express } from "express";
// import userModel from "../models/users-model";

// const router=Express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const users  = await userModel.find();
//         res.send(users);
//     } catch (error) {
//         console.error("Error retrieving users:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const body = req.body;
//         const newUser = new userModel(body);
//         await newUser.save();
//         res.status(200).send("User  data added successfully!");
//     } catch (error) {
//         console.error("Error adding user data:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const userData = req.body;
//         await userModel.findByIdAndUpdate(userId, userData);
//         res.status(200).send("User data updated successfully!");
//     } catch (error) {
//         console.error("Error updating user data:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         await userModel.findByIdAndDelete(userId);
//         res.status(200).send("User deleted successfully!");
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// export default router;


import express from 'express';
import { registerUser, loginUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;