import express from "express"
import { requiredsignin,isAdmin } from "../middleware/authmiddleware.js";
import { orderstatuscontroller,allordersadmincontroller,emailcheck,logincontroller, registercontroller,forgotcontroller,updateprofilecontroller,allorderscontroller } from "../controllers/authcontroller.js";
const router=express.Router();
router.post("/register",registercontroller)
router.post("/login",logincontroller);
// router.get("/test",requiredsignin,test);
router.post("/forgotpassword",forgotcontroller);
router.post("/emailcheck",emailcheck);
router.put("/updateprofile",requiredsignin,updateprofilecontroller);
router.get("/allorders/:id",requiredsignin,allorderscontroller);
router.get("/orders",requiredsignin,isAdmin,allordersadmincontroller);
router.put("/changeorderstatus",requiredsignin,isAdmin,orderstatuscontroller);
export default router
