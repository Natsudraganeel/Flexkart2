import Products from "../Models/Productmodel.js";
import slugify from "slugify";
import fs from "fs";
import Category from "../Models/Categorymodel.js";
import braintree from "braintree";
import Order from "../Models/Ordersmodel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//normally photo comes in the form of form data.Inoder to get form data we use express-formidable which is an npm package
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
export const createproductcontroller=async(req,res)=>{
try{
    const {image}=req.files;
    const {name,slug,description,price,category,quantity,shipping}=req.fields;
    // console.log(quantity);
    // console.log(req.fields);
    //validation
    switch(true){
        case !name:
            return res.status(400).send({success:false,message:"name not found"});
            case !description:
            return res.send({success:false,message:"description not found"});
            case !price:
            return res.send({success:false,message:"price not found"});
            case !category:
            return res.send({success:false,message:"category not found"});
            case !quantity:
            return res.send({success:false,message:"quantity not found"});
            case image && image.size>9000000 :         // this number is in bytes.Therefore 9mb
            return res.send({success:false,message:"photo exceeding size"});
    }
    const products=await new Products({name,slug:slugify(name),description,price,category,quantity,shipping});
    if(image){
        products.image.data=fs.readFileSync(image.path);
        products.image.contentType=image.type;
    }
    await products.save();
    res.send({
        success:true,
        message:"product created successfully",
        products
    })
    }

catch(err){
    res.send({
        success:false,
        
        message:"server error"
    })
}
}
export const getallproductscontroller=async(req,res)=>{
    try{
   const products=await Products.find({}).select("-image").limit(30).sort({createdAt:-1}); // select is saying everyting except image will be returned and stored in const products
   //limit :12 means 12 products will be returned
   //sort :createdAt:-1 means it will be sorted in descending order
   //select(image) eksaathe korle naki speed kome jai
   res.send({
    success:true,
    message:"products fetched successfully",
    count:products.length,
    products
   })
}
catch(err){
    res.send({
        success:false,
        message:"server error"
    })
}
}
export const getsingleproductcontroller=async(req,res)=>{
    try{

   const product=await Products.findOne({slug:req.params.slug}).select("-image") // select is saying everyting except image will be returned and stored in const products
   console.log(product.category);
   const cat=await Category.findById(product.category);
   console.log(cat);
   res.send({
    success:true,
    message:"product fetched successfully",

    product,
    cat
   })
}
catch(err){
    res.send({
        success:false,
        message:"server error"
    })
}
}
export const productimagecontroller=async(req,res)=>{
try{
const photo=await Products.findById(req.params.id).select("image");
if(photo.image.data){
res.set("Content-type",photo.image.contentType)
return res.status(200).send(photo.image.data)
}
}
catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      
    });
  }
}
export const deleteproductcontroller=async(req,res)=>{

    try{
        await Products.findByIdAndDelete(req.params.id)
        res.send({
            success:true,
            message:"product deleted successfully"
        })

    }catch(err){
        res.send({
            success:false,
            message:"server error"
        })
    }
} 
export const updateproductcontroller=async(req,res)=>{
    try{
        const {image}=req.files;
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        console.log(quantity);
        //validation
        switch(true){
            case !name:
                return res.send({success:false,message:"name not found"});
                case !description:
                return res.send({success:false,message:"description not found"});
                case !price:
                return res.send({success:false,message:"price not found"});
                case !category:
                return res.send({success:false,message:"category not found"});
                case !quantity:
                return res.send({success:false,message:"quantity not found"});
                 case quantity<0:
                return res.send({success:false,message:"quantity invalid"});
                case image && image.size>9000000 :         // this number is in bytes.Therefore 9mb
                return res.send({success:false,message:"photo exceeding size"});
        }
        const products=await Products.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)},{new:true});
        if(image){
            products.image.data=fs.readFileSync(image.path);
            products.image.contentType=image.type;
        }
        await products.save();
        res.send({
            success:true,
            message:"product updated successfully",
            products
        })
        }
    
    catch(err){
        res.send({
            success:false,
            
            message:"server error"
        })
    }
    }
    export const similarproductscontroller=async(req,res)=>{
        try{
        const {pid,cid}=req.params;
        const products=await Products.find({category:cid,_id:{$ne:pid}}).select("-image").limit(3);
        console.log(products);
        res.send({
            success:true,
            message:"similar products found",
            products
        })
        }
        catch(err){
            res.send({
                success:false,
                message:"server error"

            })
        }
    }
    export const productbycategorycontroller=async(req,res)=>{
       try{
        console.log("hello");
        // console.log(req.params);
        const category=await Category.findOne({slug:req.params.slug});
        console.log(category);
        const products=await Products.find({category}).select("-image");
      
        // console.log(products)
        res.send({
            success:true,
message:"product by category",
products,
category
        })
    }
    catch(err){
        res.send({
            success:false,
            message:"server error"

        })
    }

    }
    export const filterproductcontroller=async(req,res)=>{
        try{
        const {checked,radio}=req.body;
        const args={};
        if(checked.length>0){
            args.category=checked;
        }
        if(radio.length){
            args.price={$gte:radio[0],$lte:radio[1]};

        }
        const products=await Products.find(args).sort({createdAt:-1});
        res.send({
            success:true,
            message:"Filtered products",
            products
        })
        
    }
    catch(err){
        res.send({
            success:false,
            message:"server error"
            
        })
    }

    }
    export const categoryfilter=async(req,res)=>{
           try{
              const {radio}=req.body;
                 const args={};
                if(radio.length){
            args.price={$gte:radio[0],$lte:radio[1]};
        }
              const cat=await Category.findOne({slug:req.params.slug});
              const products=await Products.find({category:cat,...args});
              console.log("yeh le     "+products)
              res.send({
                success:true,
                products
              })
           }
           catch(err){
res.send({
                success:false,
                message:"server error"
              })
           }
    }

    export const searchproductcontroller=async(req,res)=>{
try{
const {keyword}=req.params;
const products=await Products.find({
    $or : [{name: {$regex:keyword,$options:"i"} },//regex means regular expression,searches accordinfg to the keyword ,$options:i says case insensitive
    {description: {$regex:keyword,$options:"i"} }
    ]}).select("-image")
    console.log(products)
    res.send({
        success:true,
        message:"searched",
        products
    })
}
catch(err){
    res.send({
        success:false,
        message:"server error"
    })
}
    }
    //https://developer.paypal.com/braintree/docs/start/hello-server/node   documentation of token and payment controller
    export const braintreetokencontroller=async(req,res)=>{
        try{
        gateway.clientToken.generate({}, (err, response) => {
          if(err){
            res.send(err);
          }
          else{
            res.send(response);
          }
          });
        }
        catch(err){
            console.log(err);
        }

    }
     export const braintreepaymentcontroller=async(req,res)=>{
        try{
const {cart,auth,nonce}=req.body;
let total = 0;
const validCart = [];

for (const item of cart) {
  const product = await Products.findById(item.pro._id); // Get latest product from DB

  if (!product) continue; // product not found, skip

  if (product.quantity >= item.value) {
    total += item.value * product.price;
    validCart.push(item); // only keep valid items
  }
}
// console.log("thie the valid cart        ",validCart);
if (total === 0) {
  return res.send({
    success: false,
    message: "Sorry no item available",
  });
}

console.log(total);
gateway.transaction.sale({
    amount: total,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  },async (err, result) => {
    if(result){
    const order=await new Order({
        products:validCart,
        buyerid:auth.user._id,
        buyer:auth.user,
        payments:result,
    }).save();
    await Promise.all(
  validCart.map(async (item) => {
    const productId = item.pro._id;
    const qty = item.value;

    await Products.findByIdAndUpdate(productId, {
      $inc: { quantity: -qty },
    });
  })
);
    res.send({success:true});
}
else {
    res.send({success:false,message:"payment not successful"});
}
  });
        }
        catch(err){
            res.send({success:false,message:"server error"});
        }
    }
