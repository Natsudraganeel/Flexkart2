import React, { useState ,useEffect} from "react"
import { useParams,useNavigate } from "react-router-dom";
import Price from "./listofprice"
import {Radio} from "antd"
import { useCart } from "./auth/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./auth/Auth";
import axios from "axios"

export default function Cat(){
    const params=useParams();
    const [auth,setauth]=useAuth();
    const [cart,setcart]=useCart();
    const nav=useNavigate();
    const [products,setproducts]=useState([]);
    const [category,setcategory]=useState("");
    const [radio,setradio]=useState([]);
    
    
const settingcart=(p)=>{
   if(p.quantity===0){
         toast.error("currently not available", {
                                              position: "top-right",
                                              }) 
                                              return ;
    }
    console.log(cart);
    const k=cart.find((item)=> item.pro._id===p._id);
    console.log(k);
    if(auth.user!==null && k===undefined){
   
  
    localStorage.setItem("cart",JSON.stringify([...cart,{pro:p,value:1}])); setcart([...cart,{pro:p,value:1}]);
  }
  else if(auth.user!==null && k!==undefined){
  
  }
  else{
    nav("/login");
  }
  }
    const getproductsbycategory=async()=>{
        try{
            console.log(params.slug)
const res=await axios.get(`https://flexkart2.onrender.com/api/auth/products/product-category/${params.slug}`)
console.log(res.data)
if(res.data.success){
    setproducts(res.data.products);
    setcategory(res.data.category.name);
    console.log(res.data.products);
    console.log(res.data.category.name)
} 
else{
     toast.error(res.data.message, {
                                                position: "top-right",
                                                }) 
}
        }
        catch(err){
console.log(err.message)
        }
    }
    useEffect(()=>{
        if(params?.slug){
getproductsbycategory()
        }
    },[params?.slug])
    
        const filteredproducts=async ()=>{
      try{
        console.log("new filter")
          console.log(radio);
          console.log(params.slug);
const res=await axios.post(`https://flexkart2.onrender.com/api/auth/products/categoryfilteredproducts/${params.slug}`,{radio});
if(res.data.success===true){
  console.log(radio);
setproducts(res.data.products);
console.log(res.data.products);
}
else{
  console.log("error in backend")
}
      }
      catch(err){
        console.log(err.message)
      }
    }
    useEffect(()=>{
      if(radio.length>0){
        filteredproducts();
      }
       
        },[radio])

    return (
        <>
       <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",fontSize:"25px"}}>
        <h1>{category}</h1>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",fontSize:"15px",marginTop:"2%"}}>
     <h1> Items Found- {products.length}  </h1>
        </div>
        <div style={{display:"flex",flexWrap:"wrap"}}>
        <div style={{width :"30vh", height:"40vh",  marginRight:"50px", marginLeft:"40px",  marginBottom:"20px"}}>
         <div style={{height:"45%", }}>
      <h1>Filter by Price</h1>
      <Radio.Group onChange={(e)=>{setradio(e.target.value)}}>
      {
        Price.map((c)=>{
          return(
          <>
<div key={c._id}>
<Radio value={c.array}>{c.name}</Radio>
</div>
          </>

          )
        })
      }
      </Radio.Group>
     </div>
   
       <div >
              <button onClick={()=>{window.location.reload()}} type="submit" className="w-30  text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Filter</button>
              </div>  
              </div>
       <div style={{ width : "75%", height:"100%", }}>
  
 
    <div style={{display:"flex",justifyContent:"space evenly",flexWrap:"wrap" , listStyleType: "square",width:"100%"}} >
                  
                    {

                        products.map((p)=>{
                            return(
                            <>
                          

<div style={{width:"18rem"}} className=" z-1 mx-2.5 my-2.5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
<div style={{display:"flex", justifyContent:"center"}}>
        <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`https://flexkart2.onrender.com/api/auth/products/get-image/${p._id}`} alt={p.name} />
        </div>
    <div class="p-5">
        <h5>Name: {p.name}</h5>
        <div className="flex flex-wrap">
        <p>Price:₹ {p.price}</p>
        </div>

      
    </div>
    <div className="flex flex-wrap">
    <div className="mb-10 mx-3">
              <button onClick={()=>{nav(`/details/${p.slug}`)}} type="submit" className="w-30 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">More Details</button>
              </div>
              <div className="mb-10 ml-3.5 mr-2.0">
              <button onClick={()=>{settingcart(p) }} type="submit" className="w-30 text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add to cart</button>
              </div>
              </div>
</div>


    </>)
                        })
                    }
                   
                   
</div>
 
</div>
                    </div>
                      <ToastContainer bodyClassName="toastBody"/>
        
        </>
    )
}
