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

//    if(!name || !phone || !email || !password || !role){
//     return res.json({
//         success:false,
//         message:"All fields are required"
//     })
//    }

// or

// if(!name){
//     return res.json({
//         success:false,
//         message: "Name is required"
//     })
// }
// if(!phone){
//     return res.json({
//         success:false,
//         message: "Phone is required"
//     })
// }
// if(!email){
//     return res.json({
//         success:false,
//         message: "Email is required"
//     })
// }
// if(!password){
//     return res.json({
//         success:false,
//         message: "Password is required"
//     })
// }
// if(!role){
//     return res.json({
//         success:false,
//         message: "Role` is required"
//     })
// }

 // or

 const emptyFields = [];

 if(!name) emptyFields.push('name');
 if(!phone) emptyFields.push('phone');
 if(!email) emptyFields.push('email');
 if(!password) emptyFields.push('password');
 if(!role) emptyFields.push('role');

 if(emptyFields.length > 0){
    return res.json({
        success: false,
        message: `${emptyFields.join(', ')} are required`
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