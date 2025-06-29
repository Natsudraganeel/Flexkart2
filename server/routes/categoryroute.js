import express from "express"
import { requiredsignin,isAdmin } from "../middleware/authmiddleware.js";
import { createcategorycontroller,updatecategorycontroller,allcategorycontroller,singlecategorycontroller, deletecategorycontroller, getcategorybyidcontroller } from "../controllers/categorycontroller.js";
const router=express.Router();
router.post("/create-category",requiredsignin,isAdmin,createcategorycontroller)
router.put("/update-category/:id",requiredsignin,isAdmin,updatecategorycontroller);
router.get("/getallcategories",allcategorycontroller);
router.get("/single-category/:slug",singlecategorycontroller);
router.get("/singlecategory/:id",getcategorybyidcontroller)
router.delete("/delete-category/:id",requiredsignin,isAdmin,deletecategorycontroller);

//requiredsignin,isAdmin
export default router