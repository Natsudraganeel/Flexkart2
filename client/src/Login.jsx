import React,{useState} from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink ,useNavigate} from "react-router-dom";
import { useAuth } from "./auth/Auth";
export default function Login(){
   const [email,setemail]=useState("");
   const [password,setpassword]=useState("");
   const [auth,setauth]=useAuth();
   
    


   const nav=useNavigate();
  async function handlesubmit(e){
          e.preventDefault();
          try{
            const res=await axios.post("https://flexkart2.onrender.com/api/auth/login",{
              email,
              password,
        
            })
           // console.log(res.data);
            if(res.data.success===true){
             // alert("success");
              setauth({...auth,
              user:res.data.user,
              token:res.data.token

              })
              if(res.data.user.role===0){
              nav("/dashboard");
              localStorage.setItem('auth',JSON.stringify(res.data));
              }
              else{
                nav("/admin");
              localStorage.setItem('auth',JSON.stringify(res.data));
              }
           
            }
            else{
               toast.error(res.data.message, {
                                  position: "top-right",
                                  }) 
            }
          }
          catch(err){
            console.log(err.message);
              //alert("Error in react")
          }
  }
    return  ( <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold  text-gray-900 md:text-2xl ">
            Sign in to your account
          </h1>
          <form onSubmit={handlesubmit} className="space-y-4 md:space-y-6" >
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <input value={email} onChange={(e)=>{
                setemail(e.target.value)
              }} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <input value={password} onChange={(e)=>{
                setpassword(e.target.value)
              }} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
            
              </div>
              <NavLink to="/forgotpassword" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</NavLink>
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet? <NavLink to="/register" className="font-medium text-blue-700 hover:underline ">Sign up</NavLink>
            </p>
          </form>
        </div>
      </div>
      
    </div>
    <ToastContainer bodyClassName="toastBody"/>
    </section>)
}
