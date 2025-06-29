import React ,{useState} from "react"
import { NavLink,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Register(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address,setaddress]=useState("");
  const [phone,setphone]=useState("");
    const [pass1,setpass1]=useState("");
    const [pass2,setpass2]=useState("");
    const [click,setclick]=useState("");
    const nav=useNavigate();
   
    function change1(event){
        setpass1(event.target.value);
    }
    function change2(event){
      setpass2(event.target.value);
    }
   async function handlesubmit(event){

        event.preventDefault();
      /*  try{
          const response=await fetch("https://flexkart2.onrender.com/api/auth/register",{    
               method:"POST",
               headers:{
                   'Content-Type':'application/json'
               },
              body:JSON.stringify({name:name,password:pass1,email:email,phone:phone,address:address})
           });
           const rest=await response.json();
           console.log(rest);
           if(rest.success){
  
              nav("/login");
             
           }
           else{
              alert("already registered");
           }
           console.log(response);
  
          }
          catch(err){
              console.log(err);
          }*/
          if(pass1!==pass2){
          setclick("Your password and confirm password doesnot match");
          }
          else{
          try{
            const res=await axios.post("http://localhost:3000/api/auth/register",{
              name,
              password:pass1,
              email,
              phone,
              address

            })
         //   console.log(res.data);
            if(res && res.data.success){
              //alert(res.data.message);
              nav("/login");
            }
            else{
           toast.error(res.data.message, {
                                          position: "top-right",
                                          }) 
            }
          }
          catch(err){
              console.log(err);
          }
        }
      

   }
    return (
    <section className="bg-gray-50 dark:bg-gray-900  mt-10 mb-16">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-10 sm:p-8">
        <h1 className="text-xl font-bold  text-gray-900 md:text-2xl ">
          Sign up to your account
        </h1>
        <form onSubmit={handlesubmit} className="space-y-4 md:space-y-6" >
         <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g.-Raj" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your phone</label>
            <input value={phone} onChange={(e)=>setphone(e.target.value)} type="number" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g.-12479537" required />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Your address</label>
            <input value={address} onChange={(e)=>setaddress(e.target.value)} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
            <input onChange={change1} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
            <input onChange={change2} type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <h1 style={{color:"red"}}>{click}</h1>
          <button  type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already signed up ?  <NavLink to="/login" className="font-medium text-blue-700 hover:underline ">Log in</NavLink>
            </p>
        </form>
      </div>
    </div>
  </div>
  <ToastContainer bodyClassName="toastBody"/>
</section>)

}
