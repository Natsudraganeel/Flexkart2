import { React } from "react";
import { useAuth } from "../auth/Auth";

import Spinner from "../spinner";
import Adminlayout from "./Adminlayout";
export default function AdminDashboard (){
const [auth,setauth]=useAuth();


return (
  <pre>{
    auth.user!==null && auth.user.role===1 ? (
   <div className="flex flex-wrap">
   <Adminlayout/>   
   <div className="mx-5 my-10 ">
   <h1 className="title1">Welcome Admin!!!</h1>
           <div className="list1">
               Name: {auth.user.name}
           </div>
           <div className="list1">
           Email: {auth.user.email}
           </div>
           <div className="list1">
           Phone: {auth.user.phone}
           </div>
   </div>
   </div> 

   
   )
     :
    <Spinner/>
    
    }
    </pre>     //no .4 is used to make the json object more readable(indentation)
// otherwise null,4 not required

)
}