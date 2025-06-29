import { React,useState,useEffect } from "react";
import axios from "axios";
import Adminlayout from "./Adminlayout";
import Spinner from "../spinner";
import moment from "moment-timezone"
import { useAuth } from "../auth/Auth";
import {Select} from "antd"
export default function Orders(){
  const [auth,setauth]=useAuth();
  const [orders,setorders]=useState([]);
  const [status,setstatus]=useState(["Not processing","processing","shipped","delivered"]);
  const [changestatus,setchangestatus]=useState("");
  const {Option}=Select;
  const getorders=async()=>{
    try{
        // console.log(auth.token)
       const res=await axios.get(`https://flexkart2.onrender.com/api/auth/orders`,{
        headers:{
            Authorization:auth.token
        }
       });
       
      // console.log( res.data);
        setorders( res.data);
    
       
  
       
    }
    catch(err){
        console.log(err);
    }
}
useEffect(()=>{

    getorders();
    

},[])
  function handletotal(p){
    //console.log(p);
    let total=0;
    p?.map((item)=>{total=total+item.pro.price*item.value}); 
    return "₹" + total;
  }
  function handletotal(p){
    //  console.log(p);
      let total=0;
      p?.map((item)=>{total=total+item.pro.price*item.value}); 
      return "₹" + total;
    }
    function handledate(d){
    const formatted = moment(d).tz('Asia/Kolkata').format('DD MMM YYYY, hh:mm A');
        return formatted;

    }
  const handlestatus=async(v,i)=>{
    const res=await axios.put("https://flexkart2.onrender.com/api/auth/changeorderstatus",{
      orderid:i,
      status:v
    },
      {
    headers: {
      Authorization: auth.token,
    },
  })
    getorders();//calling this will update the change in the page
  }
  
return (
  <pre>{
    auth.user!==null && auth.user.role===1 ?(
    <div className="flex flex-wrap" >
              <Adminlayout/>
              <div className=" max-[982px]:hidden my-10 w-full ">
              <h1  style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px" }}>All orders </h1>
              
        <div className="  flex flex-wrap justify-center ml-10  mb-6 py-3" style={{ backgroundColor:"rgb(250, 250, 250)",
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .60)",width:"80%"}} >
        
    
<div  className=" relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    SNo.
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Timings
                </th>
                <th scope="col" class="px-6 py-3">
                    Payment
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Price
                </th>
                
            </tr>
        </thead>
        <tbody>
        {
            orders?.map((o,i)=>{
                return(
                    <>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </td>
                <td class="px-6 py-4">
                <Select value={ o.status ? o.status  : changestatus }   className=" form-select mb-3 w-full" onChange={(value)=>handlestatus(value,o._id)}>
                {
                  status.map((c,i)=>{
                    return (
                    <>
                    <Option key={i} value={c}>
{c}
</Option>
</>)
                  }
                  )
                }
                </Select>
                </td>
                <td class="px-6 py-4">
                    {handledate(o.createdAt)}
                </td>
                <td class="px-6 py-4">
                    {o.payments.success ? "Success" :" Failed"}
                </td>
                <td class="px-6 py-4">
                    {handletotal(o.products)}
                </td>
               
                

            </tr>
            <div className="ml-2 w-full">
                    {
                        o?.products?.map((p)=>{
                            return (
                            <>
                            <div>
                            <div>
                            <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`https://flexkart2.onrender.com/api/auth/products/get-image/${p.pro._id}`} alt="N/A"
                                   onError={(e) => {
    e.target.onerror = null;
    e.target.style.display = "none";
    const altText = document.createElement("div");
    altText.textContent = e.target.alt;
    altText.style.width = "100px";
    altText.style.height = "100px";
    altText.style.marginTop = "10px";
    altText.style.display = "flex";
    altText.style.alignItems = "center";
    altText.style.justifyContent = "center";
    altText.style.border = "1px solid #ccc";
    altText.style.backgroundColor = "#f0f0f0";
    e.target.parentNode.appendChild(altText);
  }} />
                            </div>
                            <div className="mt-3 ml-3">
                            <p>Name :{p.pro.name}</p>
                            <p>Price :₹ {p.pro.price}</p>
                            <p>Quantity : {p.value}</p>
                            </div>
                            </div>
                            </>
                            )
                        })
                    }
                </div>
            </>)
            })
        }
            
           
        </tbody>
    </table>
</div>

    </div>
              </div>
              <div className="min-[983px]:hidden my-10 w-full ">
              <div className="text-center">
              <h1  style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px" }}>All orders </h1>
              </div>
              <div className=" grid  place-content-center w-full ">

       {
        orders?.map((o,i)=>{
               return (
               <>
               <div style={{width:"18rem"}} className="  z-10 mx-2.5 my-2.5  bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
                <div className="ml-2 w-full">
                    <h1>Sno.: {i+1}</h1>
                    <h1>Status: </h1>
                    <Select value={ o.status ? o.status  : changestatus }   className=" form-select mb-3 w-auto" onChange={(value)=>handlestatus(value,o._id)}>
                {
                  status.map((c,i)=>{
                    return (
                    <>
                    <Option key={i} value={c}>
{c}
</Option>
</>)
                  }
                  )
                }
                </Select>
                    <h1>Timings: {handledate(o.createdAt)}</h1>
                    <h1>Payment:  {o.payments.success ? "Success" :" Failed"}</h1>
                    <h1>Total: {handletotal(o.products)}</h1>
                </div>
                <div className="ml-2 w-full">
                    {
                        o?.products?.map((p)=>{
                            return (
                            <>
                            <div>
                            <div>
                            <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`https://flexkart2.onrender.com/api/auth/products/get-image/${p.pro._id}`} alt="N/A" 
                                       onError={(e) => {
    e.target.onerror = null;
    e.target.style.display = "none";
    const altText = document.createElement("div");
    altText.textContent = e.target.alt;
    altText.style.width = "100px";
    altText.style.height = "100px";
    altText.style.marginTop = "10px";
    altText.style.display = "flex";
    altText.style.alignItems = "center";
    altText.style.justifyContent = "center";
    altText.style.border = "1px solid #ccc";
    altText.style.backgroundColor = "#f0f0f0";
    e.target.parentNode.appendChild(altText);
  }}
                            />
                            </div>
                            <div className="mt-3 ml-3">
                            <p>Name :{p.pro.name}</p>
                            <p>Price :₹ {p.pro.price}</p>
                            <p>Quantity: {p.value} </p>
                            </div>
                            </div>
                            </>
                            )
                        })
                    }
                </div>
                </div>
               </>
               )
        })
       }
    </div>

              </div>
    </div>
    ):
    (
      <Spinner/>
    )
  }
  </pre>





)



}
