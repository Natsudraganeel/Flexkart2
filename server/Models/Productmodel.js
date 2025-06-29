import mongoose from "mongoose"

const regschema=new  mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type:mongoose.ObjectId,
    ref:'category',
    required:true
  },
  
  quantity:{
    type:Number,
    required:true
  },
  shipping:{
    type:Boolean,
    default: false
  },
  image:{
    data:Buffer,
    contentType:String
  },
 
},{
    timestamps:true       // created time will be added
});
const  Products = mongoose.model("products",regschema)
export default Products;