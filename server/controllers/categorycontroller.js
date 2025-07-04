import Category from "../Models/Categorymodel.js";
import slugify from "slugify";
import Products from "../Models/Productmodel.js";
export const createcategorycontroller=async(req,res)=>{
    try{
const {name}=req.body;
const existingcategory=await Category.findOne({name});
if(existingcategory){
    return res.send({success:false,message:"category already exists"});
}
else{
const category=await new Category({name,slug:slugify(name)} ).save();
res.send({
    success:true,
    message:"category created",
    category
})
}
    }
    catch(err){
        res.send(
            {
                success:false,
                message:"Error.no category created",
            }
        )
    }
}
export const updatecategorycontroller=async (req,res)=>{

    try{
        const {name}=req.body;
        const existingcategory=await Category.findOne({name});
if(existingcategory){
    return res.send({success:false,message:"category already exists"});
}
        const {id}=req.params;
        const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});// new:true na korle update hoi na 
        res.send({
            success:true,
            message:"category updated",
            category
        })

}
catch(err){
    res.send(
        {
            success:false,
            message:"not updated(error)"
        }
    )
}


}
export const allcategorycontroller=async(req,res)=>{
    try{
     const categories=await Category.find();
     res.send({
         success:true,
         message:"all categories",
         categories
     })
    }
    catch(err){
        res.send({
            success:false,
            message:"no category found(error)"
        })
    }

}
export const singlecategorycontroller=async (req,res)=>{
    try{
      const {slug}=req.params;
      const single=await Category.findOne({slug});// same as slug:slug
      res.send({
        success:true,
        message:"found",
        single
      })
    }
    catch(err){
res.send({
    success:false,
    message:"server error"
})
    }
}
export const getcategorybyidcontroller=async(req,res)=>{
    try{
        console.log(req.params);
const {id}=req.params;
console.log(id);
const single=await Category.findById(id);
res.send({
    success:true,
    message:"found ",
    single
})
    }
    catch(err){
        res.send({
            success:false,
            message:"server error"
        })
    }
}
export const deletecategorycontroller=async(req,res)=>{
 try{
    
    const {id}=req.params;
   

    await Category.findByIdAndDelete(id);
    await Products.deleteMany({category:id});
    res.send({
        success:true,
        message:"deleted",
        
    })

 }catch(err){

    res.send({
        success:false,
        message:"not deleted(error)"
    })
 }



}