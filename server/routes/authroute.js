import express from "express"
import { requiredsignin } from "../middleware/authmiddleware.js";
import { orderstatuscontroller,allordersadmincontroller,logincontroller, registercontroller,test,forgotcontroller,updateprofilecontroller,allorderscontroller } from "../controllers/authcontroller.js";
const router=express.Router();
router.post("/register",registercontroller)
router.post("/login",logincontroller);
router.get("/test",requiredsignin,test);
router.post("/forgotpassword",forgotcontroller);
router.put("/updateprofile",updateprofilecontroller);
router.get("/allorders/:id",allorderscontroller);
router.get("/orders",allordersadmincontroller);
router.put("/changeorderstatus",orderstatuscontroller);
export default router