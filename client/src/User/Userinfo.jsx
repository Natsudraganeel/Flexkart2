import { React } from "react";
import { useAuth } from "../auth/Auth";
import { useNavigate,NavLink } from "react-router-dom";
import img1 from "../images/useravatar.jpg";
import img2 from "../images/ordersicon.png"
import img3 from "../images/usericon.png"
import Spinner from "../spinner";
export default function Userinfo (){
const [auth,setauth]=useAuth();


return (
<div style={{marginLeft:"10%",width:"40vh"}} >
  <div className="flex flex-wrap mb-6 py-3" style={{ backgroundColor:"rgb(250, 250, 250)",
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .60)"}} >
   <div>
{<img style={{width:"40px",paddingTop:"3px", marginRight:"10px" ,marginLeft:"10px",marginTop:"3px",border:"1px solid black",borderRadius:"50%"}} src={img3}></img>
}</div>
  <div>
  <h3 style={{fontSize:"10px"}}>Hello,</h3>
  <h1>{auth.user.name}</h1>
  </div>
  </div>
  <div>
  <div className="flex flex-wrap  py-3" style={{ backgroundColor:"rgb(250, 250, 250)",
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .60)"}} >
   <div>
<img style={{width:"30px", marginRight:"10px" ,marginLeft:"10px",marginTop:"3px"}} src={img2}></img>
   </div>
  <div>
  <NavLink to="/allorders" className="hover:text-blue-700" style={{fontSize:"20px"}}>My orders</NavLink>
  </div>
  </div>
  <div className="flex flex-wrap mb-6 py-3" style={{ backgroundColor:"rgb(250, 250, 250)",
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .60)"}} >
   <div>
<img style={{width:"30px", marginRight:"10px" ,marginLeft:"10px",marginTop:"3px"}} src={img1}></img>
   </div>
  <div>
  <NavLink to="/dashboard" className="hover:text-blue-700" style={{fontSize:"20px"}}>Account Settings</NavLink>
  </div>
  </div>
  </div>
</div>

)
}