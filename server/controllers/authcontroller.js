// res.status(409).send(); when i do this ,axios error from front end comes .But it gives result for postman
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../Models/usermodel.js"
import Order from "../Models/Ordersmodel.js";
import JWT from "jsonwebtoken"
export const registercontroller=async(req,res)=>{
 try{
   console.log(req.body);
    const {name,password,email,phone,address}=req.body;
    //checking if the user already exists or not  
     let user = await User.findOne({ email: email }); 
     console.log(user);
     if (user) {return res.send({success:false,message:"already registred"});}
     //creating a new user and saving it to the database
     const hashedpassword=await hashPassword(password);
     user =await new User({ name, password:hashedpassword, email, phone , address}).save();
     //sending back the response with status code and json data of the created user
     res.status(201).send({success:true,
        message: 'User has been created',
        user});
 }catch(err){
     res.send({
        success:false,
        message:"error  in registration",
     })
 }
 }

 export const  logincontroller=async(req,res)=> {
     try{
        const {email,password}= req.body;
      //  if(!email && !password ) return res.status(400).send({success :false, message:'YOU are not registered'});
        
        //verifying the password using the helpers function
        let user = await User.findOne({ email: email });
        if (!user){ return res.send({success:false,message:'Email does not exist'})}
else{
        let match=await comparePassword(password,user.password);
        if(!match) {return res.send({success:false,message:'Invalid Password'})}
        else{
        //create token for authentication
        let token=JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"3h"});//signing the payload which contains _id of the user
        res.send({
         success:true,
         message: 'login successful',
        user: {
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
      token:token});}
      }
        
        
     }
     catch(err){
        res.send({
            success:false,
            message:"login error"
        })
    }

 }
 export const emailcheck=async(req,res)=>{
 const {email}=req.body;
  let user= await User.findOne({email:email});  // i forgot to write await here.The problem i faced was that the user was not found.
  console.log(user.name);
  if(!user){
    return res.send({success:false,message:"You are not registered"});
  }
  res.send({
    success:true,
    message:"You are registered"
  })
 }
export const forgotcontroller=async(req,res)=>{
  try{
    
  const {email}=req.body;
  let user= await User.findOne({email:email});  // i forgot to write await here.The problem i faced was that the user was not found.
  console.log(user.name);
  if(!user){
    return res.send({success:false,message:"You are not registered"});
  }
  
  else{
    //create token for authentication
    let token=JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"3h"});//signing the payload which contains _id of the user
    res.send({
     success:true,
     message: 'login successful',
    user: {
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        role:user.role
        
    },
  token:token});}
}
catch(err){
  res.send({
      success:false,
      message:"login error"
  })
}

}
export const updateprofilecontroller=async(req,res)=>{
try{
const {name,address,email,phone,opassword,npassword,id}=req.body;
console.log(id);
let user=await User.findById(id);
console.log(user);
       let match=await comparePassword(opassword,user.password);
        if(!match) {return res.send({success:false,message:'Invalid Old Password'})}
const hashedpassword= npassword ? await hashPassword(npassword) : undefined;
//console.log(hashedpassword);
const updateduser=await User.findByIdAndUpdate(id,{
  name:name || user.name,
  address:address || user.address,
  email:email,
  phone:phone || user.phone,
  password: hashedpassword || user.password

},{new:true});
res.send({
  success:true,
  message:"update successful",
  updateduser

})

}
catch(err){
  res.send({
    success:false,
    message:"server error"
    
  })
}
}
//  export const test=async(req,res)=>{
//     res.send("protrcde route");
//  }
export const allorderscontroller=async(req,res)=>{
  try{
    console.log(req.params.id)
    let orders=await Order.find({buyerid:req.params.id}).sort({ createdAt: -1 });
    console.log(orders);
    res.json(orders);
  }
  catch(err){
    res.send({
      success:false,
      message:"server error"
      
    })
  }
}
export const allordersadmincontroller=async(req,res)=>{
  try{
    
    let orders=await Order.find({}).sort({ createdAt: -1 });;
   // console.log(orders);
    res.json(orders);
  }
  catch(err){
    res.send({
      success:false,
      message:"server error"
      
    })
  }
}
export const orderstatuscontroller=async(req,res)=>{
  try{
 const {orderid,status}=req.body;
 const ans=await Order.findByIdAndUpdate(orderid,{status},{new:true});
 console.log(ans);
 res.send(ans);
  }
  catch(err){
console.log(err.message);
  }
}
