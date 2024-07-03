import { React,useState,useEffect } from "react";
import { useAuth } from "../auth/Auth";
//import { useNavigate,NavLink } from "react-router-dom";
import Userinfo from "./Userinfo";
//import moment from "moment"
import Spinner from "../spinner";
import axios from "axios";
export default function Allorders (){
    const [auth,setauth]=useAuth();
    const [orders,setorders]=useState([]);
    const getorders=async()=>{
        try{
           const res=await axios.get(`http://localhost:3000/api/auth/allorders/${auth.user._id}`);
           
           //console.log( res.data);
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
    //  console.log(p);
      let total=0;
      p?.map((item)=>{total=total+item.pro.price*item.value}); 
      return "₹" + total;
    }
    function handledate(d){
        let ans1=d.slice(0,10);
        let ans2=d.slice(12,19)
        return ans1+" "+ans2;

    }
    return(
    
        <pre>{

      auth.user!==null && auth.user.role===0 ? (
        <div className="flex flex-wrap">
        <Userinfo/> 
 
        <div className=" max-[952px]:hidden flex flex-wrap justify-center ml-10 mr-10 mb-6 py-3" style={{ backgroundColor:"rgb(250, 250, 250)",
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .60)",width:"80%"}} >
        
    
<div className="relative overflow-x-auto">
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
                    {o.status}
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
                            <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`http://localhost:3000/api/auth/products/get-image/${p.pro._id}`} alt={p.name} />
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
            </>)
            })
        }
            
           
        </tbody>
    </table>
</div>

    </div>
    <div className="min-[953px]:hidden grid  place-content-center w-full ">
    <div className="text-center">
    <h1 style={{fontSize:"35px",marginBottom:"20px"}}>All Orders</h1>
    </div>
       {
        orders?.map((o,i)=>{
               return (
               <>
               <div style={{width:"18rem"}} className="  z-10 mx-2.5 my-2.5  bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
                <div className="ml-2 w-full">
                    <h1>Sno.: {i+1}</h1>
                    <h1>Status: {o.status}</h1>
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
                            <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`http://localhost:3000/api/auth/products/get-image/${p.pro._id}`} alt={p.name} />
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
)
       :
      <Spinner/>
      
      }
      </pre>    )
}