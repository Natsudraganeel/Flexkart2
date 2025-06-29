import {React,useState,useEffect} from "react";
import axios from "axios";
import Adminlayout from "./Adminlayout";
import Spinner from "../spinner";
import { useAuth } from "../auth/Auth";
import { Link } from "react-router-dom";
export default function Allproducts(){
    const [auth,setauth]=useAuth();

    const [products,setproducts]=useState([]);
    const [word,setword]=useState("");
    const getallproducts=async()=>{
        try{
        const res=await axios.get("https://flexkart2.onrender.com/api/auth/products/getallproducts");
        if(res.data.success==true){
          console.log(res.data.products);
            setproducts(res.data.products);
        }
        else{
            console.log("error");
        }
    }
    catch(err){
        console.log(err.message);
    }


    }
    useEffect(()=>{
        getallproducts();
       
        },[])

        const handlesubmit=async()=>{
            try{
            const res=await axios.get(`https://flexkart2.onrender.com/api/auth/products/searchproduct/${word}`);
            if(res.data.success===true){
                setproducts(res.data.products);
            }
            else{
              alert(res.data.message);
            }
        }
        catch(err){
              console.log(err.message);
        }
        }
    return (
    <pre>{
        auth.user!==null && auth.user.role===1 ?(
        <div className="flex flex-wrap " style={{width:"100%" }} >
                  <Adminlayout/>
      
       <div style={{width:"100%",display:"flex",flexWrap:"wrap" }}></div>
                   <div style={{width:"100%"}}>
                  <h1 style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px"}}>All products List</h1>
                  </div>


                  <div class="w-full max-w-sm min-w-[200px] mx-8">
  <div class="relative">
    <input
      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      placeholder="Search Products" onChange={(e)=>{setword(e.target.value)}}
    />
    <button onClick={handlesubmit}
      class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
      </svg>
 
      Search
    </button> 
  </div>
</div>


         
                 <div style={{marginLeft:"30px", display:"flex",justifyContent:"space evenly",flexWrap:"wrap" , listStyleType: "square",width:"100%"}} >
                  
                    {
                        products.map((p)=>{
                            return(
                            <>
                          <Link key={p._id} to={`/admin/updateproduct/${p.slug}`}>

                          <div style={{width:"18rem"}} className=" z-10 mx-2.5 my-2.5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
<div style={{display:"flex", justifyContent:"center"}}>
        <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`http://localhost:3000/api/auth/products/get-image/${p._id}`} alt={p.name} />
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
