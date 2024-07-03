import {React,useState,useEffect} from "react";
import axios from "axios";
import Adminlayout from "./Adminlayout";
import Spinner from "../spinner";
import { useAuth } from "../auth/Auth";
import { Link } from "react-router-dom";
export default function Allproducts(){
    const [auth,setauth]=useAuth();

    const [products,setproducts]=useState([]);
    const getallproducts=async()=>{
        const res=await axios.get("https://flexkart2.onrender.com/api/auth/products/getallproducts");
        if(res.data.success==true){
            setproducts(res.data.products);
        }
        else{
            console.log("error");
        }


    }
    useEffect(()=>{
        getallproducts();
       
        },[])
    return (
    <pre>{
        auth.user!==null && auth.user.role===1 ?(
        <div className="flex flex-wrap " style={{width:"100%" }} >
                  <Adminlayout/>
      
       <div style={{width:"100%",display:"flex",flexWrap:"wrap" }}></div>
     
                  <h1   style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px" }}>All products List</h1>
         
                 <div style={{marginLeft:"30px", display:"flex",justifyContent:"space evenly",flexWrap:"wrap" , listStyleType: "square",width:"100%"}} >
                  
                    {
                        products.map((p)=>{
                            return(
                            <>
                          <Link key={p._id} to={`/admin/updateproduct/${p.slug}`}>

                          <div style={{width:"18rem"}} className=" z-10 mx-2.5 my-2.5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
<div style={{display:"flex", justifyContent:"center"}}>
        <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`https://flexkart2.onrender.com/api/auth/products/get-image/${p._id}`} alt={p.name} />
        </div>
    <div class="p-5">
        <h5>Name: {p.name}</h5>
        <div className="flex flex-wrap">
        <p>Price:₹ {p.price}</p>
        </div>

      
    </div>
</div>

</Link>     </>)
                        })
                    }
</div>
                 </div>
                
                  ):
                  (<Spinner/>)
    }
    </pre>
    )
}
