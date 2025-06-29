import { React, useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useCart } from "./auth/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./auth/Auth";


export default function Details(){
    const params=useParams();
    const nav=useNavigate();
    const [cart,setcart]=useCart();
    const [auth,setauth]=useAuth();
    const [product,setproduct]=useState({});
    const [similarproducts,setsimilarproducts]=useState([]);
    const settingcart=(p)=>{
         if(p.quantity===0){
               toast.error("currently not available", {
                                                    position: "top-right",
                                                    }) 
                                                    return ;
          }
       // console.log(cart);
        const k=cart.find((item)=> item.pro._id===p._id);
       // console.log(k);
        if(auth.user!==null && k===undefined){
       
      
        localStorage.setItem("cart",JSON.stringify([...cart,{pro:p,value:1}])); setcart([...cart,{pro:p,value:1}]);
      }
      else if(auth.user!==null && k!==undefined){
      
      }
      else{
        nav("/login");
      }
      }
const handlesingleproduct=async(e)=>{

try{
const res=await axios.get(`http://localhost:3000/api/auth/products/get-product/${params.slug}`);
if(res.data.success){
setproduct(res.data.product);
getsimilarproducts(res.data.product._id,res.data.product.category);
}
else{
toast.error(res.data.message, {
  position: "top-right",
  }) 
}
}
catch(err){
    console.log(err.message);
}

}
useEffect(()=>{
    if(params?.slug){
    handlesingleproduct();
    }
},[params?.slug])
const getsimilarproducts=async(pid,cid)=>{
    try{
        const res=await axios.get(`http://localhost:3000/api/auth/products/similarproducts/${pid}/${cid}`);
        if(res.data.success===true){
setsimilarproducts(res.data.products);
        }
        else{
            console.log("backend pblm");
        }
    }
    catch(err){
console.log(err);
    }
}
return(
    <>
    <div style={{display:"flex",flexWrap:"wrap"}}>
    <div style={{height:"30%",width:"30%",marginBottom:"10px"}}>
    <img  style={{width:"70%" ,height :"70%", marginTop:"10px",marginLeft:"10%" }}   src={`http://localhost:3000/api/auth/products/get-image/${product._id}`} alt={product.name} />
    </div>
    <div style={{height:"30%",width:"60%",marginBottom:"10px", marginLeft:"5%"}}>
    <div style={{marginTop:"3%",marginBottom:"3%"}}>
        <h1 style={{marginTop:"5px",marginBottom:"5px"}}>Name: {product.name}</h1>
        <h1 style={{marginTop:"5px",marginBottom:"5px"}}>Price: {product.price}</h1>
        <h1 style={{marginTop:"5px",marginBottom:"5px"}}>Available quantity: {product.quantity}</h1>
        <h1 style={{marginTop:"5px",marginBottom:"5px"}}>Desciption: {product.description}</h1>
        </div>
        <button onClick={()=>{ settingcart(product)}} type="submit" className="w-30 my-4 text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add to cart</button>
    </div>
    </div>
    <div style={{display:"flex",flexWrap:"wrap"}}>
    <h1   style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px" ,width:"100%"}}>Similar products </h1>
      <div style={{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px"}}>
    <h3 >{similarproducts.length>0 ? "" : "No such item found"}</h3>
    </div>
    <div style={{display:"flex",justifyContent:"space evenly",flexWrap:"wrap" , listStyleType: "square",width:"100%"}} >
                  
                  {

                      similarproducts.map((p)=>{
                          return(
                          <>
                        

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
  <div className="flex flex-wrap">
  <div className="mb-10 mx-3">
            <button onClick={()=>{nav(`/details/${p.slug}`);}} type="submit" className="w-30 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">More Details</button>
            </div>
            <div className="mb-10 ml-3.5 mr-2.0">
            <button onClick={()=>{ settingcart(p)}} type="submit" className="w-30 text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add to cart</button>
            </div>
            </div>
</div>


  </>)
                      })
                  }
                  </div>

    </div>
      <ToastContainer bodyClassName="toastBody"/>
    </>
)
}
