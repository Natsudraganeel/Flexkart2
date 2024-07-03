import  React,{useState}  from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { NavLink ,useNavigate} from "react-router-dom";
import { useAuth } from "./auth/Auth";

export default function Forgot (){
    const [email,setemail]=useState("");
    const [otp1,setotp1]=useState("");
    const [otp2,setotp2]=useState("")
    const [otp3,setotp3]=useState("")
    const [otp4,setotp4]=useState("");
    const [sentotp,setsentotp]=useState();
    const [click,setclick]=useState("");
    const [auth,setauth]=useAuth();
    var ox;
    const nav=useNavigate();
   

        async function sendEmail(event){

            event.preventDefault();
    
            try{
              const res=await axios.post("http://localhost:3000/api/auth/forgotpassword",{
                email
              })
              // console.log(res.data);
            if(res.data.success===false){
                alert(res.data.message);
            }
            else{
                ox=Math.random();
                ox=ox*9000;
                ox=Math.floor(ox)+1000;
              
               // console.log(ox);
                  setsentotp(ox);
                 // console.log(sentotp);
                const config={
                  Username : process.env.REACT_APP_USERNAME,
                  Password : process.env.REACT_APP_SMTP_PASSWORD,
                  Host : process.env.REACT_APP_SMTP_HOST,
                  Port:process.env.REACT_APP_SMTP_PORT,
                  To : email,
                  From : process.env.REACT_APP_MY_EMAIL,
                  Subject : "Email Verifiaction",
                  Body : `Your otp  is ${ox}`,
                  
              }
              if(window.Email){
                window.Email.send(config).then(
                  () =>toast.info('OTP has been sent.Check your mail', {
                    position: "top-right",
                    
              
                    
                    }) 
                ); 
              }
            }
            }
              catch(err){
                console.log(err);
              }
            
  
        

    }
    
    async function handlesubmit(e){
            e.preventDefault();
            try{
              const res=await axios.post("http://localhost:3000/api/auth/forgotpassword",{
                email,
               
          
              })
              let ans=otp1+otp2+otp3+otp4;
            //  console.log(res.data);
            //  console.log(sentotp);
              if(res.data.success===true && sentotp==ans){
               
                setauth({...auth,
                user:res.data.user,
                token:res.data.token
  
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                //alert("success");
                nav("/");
             
              }
              else if(res.data.success===true && sentotp!==ans){
                 setclick("The otp entered is wrong.Try resending the otp");
              }
              else{
                alert(res.data.message);
              }
            }
            catch(err){
              console.log(err);
                alert("Error in react")
            }
    }
    return (

<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Enter Email</p>
        </div>
       
        
      </div>
      <form onSubmit={sendEmail}>
           
              <input  value={email} onChange={(e)=>{
                setemail(e.target.value)}} type="email" name="email" id="email" className=" mb-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
            <button  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white text-1xl shadow-sm">
                  Submit email
                </button>
            </form>
            
      <div>
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
          <p className="font-semibold text-3xl">Enter OTP</p>
        </div>
        <form onSubmit={handlesubmit} method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input onChange={(e)=>{
                setotp1(e.target.value)}}  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300  text-lg bg-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" minLength="1" maxLength="1" required />
              </div>
              <div className="w-16 h-16 ">
                <input onChange={(e)=>{
                setotp2(e.target.value)}} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300  text-lg bg-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" minLength="1" maxLength="1" required/>
              </div>
              <div className="w-16 h-16 ">
                <input onChange={(e)=>{
                setotp3(e.target.value)}} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300  text-lg bg-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" minLength="1" maxLength="1" required />
              </div>
              <div className="w-16 h-16 ">
                <input onChange={(e)=>{
                setotp4(e.target.value)}} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300  text-lg bg-gray-50 focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" minLength="1" maxLength="1" required />
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
              <h1 style={{color:"red"}}>{click}</h1>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white text-1xl shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve OTP?</p> <a onClick={sendEmail} className="flex flex-row items-center text-blue-600"  target="_blank" rel="noopener noreferrer">Resend OTP</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ToastContainer bodyClassName="toastBody"/>
</div>
    
    )
    }