import React,{useState} from "react";
import axios from "axios";
import { useAuth } from "../auth/Auth";

export default function Modal({closeForm,props}){
    const parent = {
        position:"relative"
      };
      const formdiv={
        border:"0.5px solid black",
        padding :"20px 20px 50px 20px",
        borderRadius:"20px",
        backdropFilter: "blur(2px)",
        margin:"10% 20% 10% 20%"
    
      }
     const cross={
        //border :"1px solid black",
        position: "absolute",
        right:"4px",
        top:"3px"
     }
        const [auth,setauth]=useAuth();
     const [updatedname,setupdatedname]=useState("")
  
  const handleupdate=async(e)=>{
          e.preventDefault();
    try{
      const response=await axios.put(`http://localhost:3000/api/auth/category/update-category/${props._id}`,{
        name:updatedname
      },{
    headers: {
      Authorization: auth.token,
    },
  })
      //console.log(response)
      if(response.data.success===true){
          alert(response.data.message)
       window.location.reload();
      }
      else{
         alert(response.data.message)
      }

    }
    catch(err){
alert("react error")
    }

  }

   
    return (
        <div className="fixed z-20 inset-0 flex items-center justify-center " >
         
            <div className="popup-form absolute mt-10 text-black" style={formdiv}>
            <svg style={cross} onClick={closeForm} className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            <form onSubmit={handleupdate} className="flex items-center max-w-sm mt-6 ">   
  <label htmlFor="simple-search" className="sr-only">Search</label>
  <div className="relative w-full">
    <input onChange={(e)=>{setupdatedname(e.target.value)}} type="text" id="simple-search" className="bg-gray-50 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.name} required />
  </div>
  <button type="submit" className="p-2.5 ms-2 mr-5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Submit
  </button>
</form>
            </div>
         
        </div>
        
    )


}
