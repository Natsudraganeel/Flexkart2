import express from "express"
import { requiredsignin,isAdmin } from "../middleware/authmiddleware.js";
import { createcategorycontroller,updatecategorycontroller,allcategorycontroller,singlecategorycontroller, deletecategorycontroller, getcategorybyidcontroller } from "../controllers/categorycontroller.js";
const router=express.Router();
router.post("/create-category",createcategorycontroller)
router.put("/update-category/:id",updatecategorycontroller);
router.get("/getallcategories",allcategorycontroller);
router.get("/single-category/:slug",singlecategorycontroller);
router.get("/singlecategory/:id",getcategorybyidcontroller)
router.delete("/delete-category/:id",deletecategorycontroller);

//requiredsignin,isAdmin
export default router