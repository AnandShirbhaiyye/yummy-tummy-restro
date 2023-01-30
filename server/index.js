import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from './models/user.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log('Connected to MongoDB');
})

// api routes starts here
app.post('/signup', async (req, res)=>{
   const {name, phone, email, password, role} = req.body;

   if(!name || !phone || !email || !password || !role){
    return res.json({
        success:false,
        message:"All fields are required"
    })
   }

   const user = new User({
    name: name,
    phone: phone,
    email: email,
    password: password,
    role: role
   })

   const savedUser = await user.save();

   res.send({
    success: true,
    message: "User created successfully...",
    data: savedUser
   })
})

app.listen(5000,()=>{
    console.log(`Server is running on port ${PORT}`);
})