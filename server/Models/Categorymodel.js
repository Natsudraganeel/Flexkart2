import mongoose from "mongoose"

const regschema=new  mongoose.Schema({
  name:{
    type:String,
    unique:true,
    required:true
  },
  slug:{
    type:String,       // slug is used to convert spaces into -.e.g slugify(name) wheere name=kids bal will be slug=kids-bal
    lowercase:true
   
  }
  
},{
    timestamps:true       // created time will be added
});
const  Category = mongoose.model("Category",regschema)
export default Category;