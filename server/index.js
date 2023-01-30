import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/user.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

// api routes starts here
app.post("/signup", async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  // validations to check if all fields are filled starts here

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

  if (!name) emptyFields.push("name");
  if (!phone) emptyFields.push("phone");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");
  if (!role) emptyFields.push("role");

  if (emptyFields.length > 0) {
    return res.json({
      success: false,
      message: `${emptyFields.join(", ")} are required`,
    });
  }
  // validations to check if all fields are filled end here

  // validations to check if email already exists starts here
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.json({
      success: false,
      message: "Email already exists",
    });
  }
  // validations to check if email already exists end here

  // validations to check if phone already exists starts here
  const existingUserPhone = await User.findOne({ phone: phone });
  if (existingUserPhone) {
    return res.json({
      success: false,
      message: "Phone already exists",
    });
  }
  // validations to check if phone already exists end here

  const user = new User({
    name: name,
    phone: phone,
    email: email,
    password: password,
    role: role,
  });

  const savedUser = await user.save();

  res.send({
    success: true,
    message: "User created successfully...",
    data: savedUser,
  });
});

app.post("/login", async(req, res)=>{
   const {email, password} = req.body;

   if(!email || !password){
    return res.json({
        success: false,
        message: "Email and Password are required"
    })
   }

   const existingUser = await User.findOne({email:email,password: password});

   if(existingUser){
    return res.json({
        success: true,
        message: "Login Successful",
        data: existingUser
    })
   }
   else
   {
    return res.json({
         success: false,
         message: "Invalid email or password"
    })
   }
})

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
