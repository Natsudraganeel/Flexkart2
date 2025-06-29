import express from "express"
import { requiredsignin,isAdmin } from "../middleware/authmiddleware.js";
import {createproductcontroller,productbycategorycontroller,similarproductscontroller,searchproductcontroller,filterproductcontroller,getallproductscontroller,updateproductcontroller,getsingleproductcontroller,productimagecontroller,deleteproductcontroller,categoryfilter ,braintreetokencontroller,braintreepaymentcontroller} from "../controllers/productcontroller.js"
import formidable from "express-formidable"
const router = express.Router();
router.post("/create-product",requiredsignin,isAdmin,formidable(),createproductcontroller);
router.put("/update-product/:id",requiredsignin,isAdmin,formidable(),updateproductcontroller);
router.get("/getallproducts",getallproductscontroller);
router.get("/get-product/:slug",getsingleproductcontroller);
router.get("/get-image/:id",productimagecontroller)
router.delete("/delete-product/:id",requiredsignin,isAdmin,deleteproductcontroller);
router.post("/filteredproducts",filterproductcontroller);
router.post("/categoryfilteredproducts/:slug",categoryfilter);
//router.get("/productcount",productcountcontroller);
//router.get("/product-list/:page",productlistcontroller);
router.get("/searchproduct/:keyword",searchproductcontroller);
router.get("/similarproducts/:pid/:cid",similarproductscontroller);
router.get("/product-category/:slug",productbycategorycontroller);
router.get("/product/token",braintreetokencontroller);
router.post("/product/payment",requiredsignin,braintreepaymentcontroller);

export default router