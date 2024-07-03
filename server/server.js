import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js";
import morgan from "morgan";
import cors from "cors";

import authroutes from "./routes/authroute.js"
import productroutes from "./routes/productroute.js"
import categoryroutes from "./routes/categoryroute.js"
dotenv.config();// sabse upar hona chahiye
const app=express();
app.use(cors());
app.use(express.json());// alternative of bodyparser
app.use(morgan('dev')); //log req and res in console for development
app.use("/api/auth",authroutes);
app.use("/api/auth/category",categoryroutes);
app.use("/api/auth/products",productroutes);

const port=process.env.PORT || 3000; // by default if there isa problem in .env then use 3000 
app.get("/",async(req,res)=>{
    res.send("Hello World");
})
connectDB().then(()=>{app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })})