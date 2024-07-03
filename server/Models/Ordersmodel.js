import mongoose from "mongoose"

const regschema=new  mongoose.Schema({
  products:[],
  buyerid:{
    type:mongoose.ObjectId,
    required:true,
  },
  buyer:{},
  payments:{},
  status:{
    type:String,
    default:"Not processing",
    enum:["Not processing","processing","shipped","delivered","cancel"]
  }

  
},{
    timestamps:true       // created time will be added
});
const  Order = mongoose.model("Order",regschema)
export default Order;