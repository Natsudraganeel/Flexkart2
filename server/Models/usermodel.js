import mongoose from "mongoose"

const regschema=new  mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true
  },
  password:
  {
    type:String,
    required:true,

  },
  email:{
    type: String,
    unique : true,
  },
  phone:{
    type:Number,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  role:{          // if role =0 ,user.for role=1, admin
    type:Number,
    default:0
  },
},{
    timestamps:true       // created time will be added
});
const  User = mongoose.model("users",regschema)
export default User;