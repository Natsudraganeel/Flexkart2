import { React,useState,useEffect } from "react";
import { useAuth } from "../auth/Auth";
import { useNavigate,NavLink } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userinfo from "./Userinfo";
import Spinner from "../spinner";
import axios from "axios";
export default function Dashboard (){
  const [auth,setauth]=useAuth();
  //console.log(auth);   // willc oome as null
  let ls=localStorage.getItem("auth");
  ls=JSON.parse(ls);
  const [name, setName] = useState(ls.user.name);  // auth has to be always used inside a function so auth.user.anything shouldnt be used in useState
  const [email, setEmail] = useState(ls.user.email);
  const [address,setaddress]=useState(ls.user.address);
  const [phone,setphone]=useState(ls.user.phone);
  const [pass1,setpass1]=useState("");
  const [pass2,setpass2]=useState("");


async function handlesubmit(e){
  e.preventDefault();
 // console.log("in update")
  try{
const res=await axios.put("http://localhost:3000/api/auth/updateprofile",{
  name,address,email,phone,opassword:pass1,npassword:pass2,id:auth.user._id
}, {
    headers: {
      Authorization: auth.token,
    },
  });
//console.log(res.data);
if(res.data.success===true){
// console.log("ins uccess")
              setauth({...auth,
              user:res.data.updateduser,
              token:res.data.token

              })
  let ls=localStorage.getItem("auth");
  ls=JSON.parse(ls);
  ls.user=res.data.updateduser;
  localStorage.setItem('auth',JSON.stringify(ls));
 // alert("success");
 toast.info('Updated Successfully!', {
  position: "top-right",
  

  
  }) 


}
else{
   toast.error(res.data.message, {
                                            position: "top-right",
                                            }) 
}

  }
  catch(err){
    console.log("error in react",err);
  }

}


  return (
    <pre>{
      auth.user!==null && auth.user.role===0 ? (
     <div className="flex flex-wrap">
     <Userinfo/>   
     <div className="flex flex-wrap justify-center ml-10 mr-10 mb-6 py-3" style={{ backgroundColor:"rgb(250, 250, 250)",
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .60)",width:"100vh",height:"103vh"}} >
<section className="bg-gray-50 dark:bg-gray-900  mt-2 mb-16 w-9/12">
  <div className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-10 sm:p-8">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold  text-gray-900 md:text-2xl ">
          Your Profile
        </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit} >
         <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
          </div>
      
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your phone</label>
            <input value={phone} onChange={(e)=>setphone(e.target.value)} type="number" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Your address</label>
            <input value={address} onChange={(e)=>setaddress(e.target.value)} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
          </div>
          <div>
            <label htmlFor="opassword" className="block mb-2 text-sm font-medium text-gray-900 ">Old Password</label>
            <input  onChange={(e)=>setpass1(e.target.value)} type="password" name="opassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
          </div>
          <div>
            <label htmlFor="npassword" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
            <input  onChange={(e)=>setpass2(e.target.value)} type="password" name="npassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
          </div>
        

          <button  type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
          
        </form>
      </div>
    </div>
  </div>
</section>
 
  </div>
  <ToastContainer bodyClassName="toastBody"/>
     </div> 
  
     
     )
       :
      <Spinner/>
      
      }
      </pre>    )
}
