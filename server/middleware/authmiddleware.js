import JWT from "jsonwebtoken"
import User from "../Models/usermodel.js"
// 
var ele={msg:"jjj"}
export const requiredsignin = async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      console.log(req.headers.authorization);// token
      console.log(decode);
     req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
  //admin acceess
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
    
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };