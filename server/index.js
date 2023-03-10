import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";
import FoodItem from "./models/FoodItem.js";
import Table from "./models/Table.js";
import Order from "./models/Order.js";

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

app.post("/createFoodItem",async (req, res)=>{
  const {title, description, imgUrl, price, category} = req.body;

  const foodItem = new FoodItem({
    title: title,
    description:description,
    imgUrl: imgUrl,
    price: price,
    category: category
  })
  const savedFoodItem = await foodItem.save();

  res.json({
    success: true,
    message: "Food Item created successfully...",
    data: savedFoodItem
  })
})

// http://localhost:5000/foodItemByCategory?category=pizza
app.get("/foodItemsByCategory", async(req,res)=>{
   const {category} = req.query;

   const foodItems = await FoodItem.find({
    category: {$regex:category, $options: 'i'}
   })
   res.json({
    success: true,
    message:"Food Items fetched successfully...",
    data:foodItems
   })
})

// http://localhost:5000/foodItem?title=pizza
app.get("/foodItems", async(req,res)=>{
  const {title} = req.query;

  const foodItems = await FoodItem.find({
    title: {$regex: title, $options: 'i'}
  })
  res.json({
   success: true,
   message:"Food Items fetched successfully...",
   data:foodItems
  })
})

app.post("/createTable",async(req, res)=>{
    const {tableNumber} = req.body;

    const existingTable = await Table.findOne({tableNumber: tableNumber});

    if (existingTable){
      return res.json({
        success: false,
        message: "Table already exists"
      })
    }

    const table = new Table({
      tableNumber: tableNumber,
      occupied: false,
    })

    const savedTable = await table.save();

    res.json({
      success: true,
      message: "Table created successfully...",
      data: savedTable
    })
})

app.post("/bookTable", async (req,res)=>{
   const {tableNumber, userId} = req.body;

   const existingTable = await Table.findOne({tableNumber: tableNumber});
   if(existingTable && existingTable.occupied){
    return res.json({
      success: false,
      message: "Table already occupied..."
    })
   }

   if(existingTable){
    existingTable.occupied = true;
    existingTable.occupiedBy = userId;
    await existingTable.save();
   }

   res.json({
    success: true,
    message: "Table boooked successfully...",
    data: existingTable
   })
})

app.post("/unbookTable", async(req, res)=>{
  const {tableNumber} = req.body;
  const existingTable = await Table.findOne({tableNumber: tableNumber});

  if(existingTable){
    existingTable.occupied = false;
    existingTable.occupiedBy = null;
    await existingTable.save();
  }

  res.json({
    success: true,
    message: "Table unbooked successfully...",
    data: existingTable
  })
})


app.get("/availableTables", async(req,res)=>{
   const availableTables = await Table.find({occupied: false});

   res.json({
    success: true,
    message: " Available tables fetched successfully...",
    data: availableTables
   })
})

app.post("/orderFoodItems", async(req,res)=>{
  const {userId, tableNumber, items} = req.body;
 
  // // generate 5 digit unique order id with current hours and minutes
  // const orderId ="ord" + new Date().getHours() + "" +new Date().getMinutes() + "" + Math.floor(1000 + Math.random() * 9000);

  const totalOrders = await Order.countDocuments();

  const orderId = totalOrders + 1; 

  const order = new Order({
    orderId: orderId,
    userId: userId,
    tableNumber: tableNumber,
    items: items
  })

  const savedOrder = await order.save();

  res.json({
    success: true,
    message:"Order placed Successfully...", 
    data: savedOrder
  })
})

app.get("/order", async(req,res)=>{
  const {orderId} = req.query;

  const order = await Order.findOne({orderId: orderId})

  res.json({
    success: true,
    message: "Order fetched Successfully...",
    data: order

  })
})

app.get("/orderByUserId",async(req,res)=>{
       const {userId} = req.query;

       const orders = await Order.find({userId: userId});

       res.json({
        success:true,
        message: "Order fetched Successfully...",
        data: orders
       })
});

//api routes ends here

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
