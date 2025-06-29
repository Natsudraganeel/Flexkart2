import { React, useState,useEffect } from "react";
import { useCart } from "./auth/Cart";
import { useAuth } from "./auth/Auth";
import { Carousel, Checkbox } from "flowbite-react"; //npm i flowbite-react
import { Link } from "react-router-dom";
import axios from "axios";
import img1 from "./images/Frame 1.png"
import img2 from "./images/off.webp"
import img3 from "./images/gadgetsoffer.png"
import Price from "./listofprice"
import {Radio} from "antd"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from "react-router-dom";
export default function Home (){
const nav=useNavigate();
const [auth,setauth]=useAuth();
const [cart,setcart]=useCart();
const [products,setproducts]=useState([]);
const [categories,setcategories]=useState([]);
const [checked,setchecked]=useState([]);
const [radio,setradio]=useState([]);

const settingcart=(p)=>{
  if(p.quantity===0){
       toast.error("currently not available", {
                                            position: "top-right",
                                            }) 
                                            return ;
  }
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
const getallcategories=async()=>{
  try{
const res=await axios.get("https://flexkart2.onrender.com/api/auth/category/getallcategories");
if(res.data.success===true){
  setcategories(res.data.categories)
 
}
else{
   toast.error(res.data.message, {
                                            position: "top-right",
                                            }) 
}
  }
  catch(err){
    alert(err.message)
  }
}
useEffect(()=>{
  getallcategories();
 
  },[])

  const getallproducts=async()=>{
    try{
    const res=await axios.get("https://flexkart2.onrender.com/api/auth/products/getallproducts");
    if(res.data.success==true){
        setproducts(res.data.products);
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
  if(!radio.length>0 || !checked.length>0){
    getallproducts();
  }
   
    },[radio.length,checked.length])
    
    const filteredproducts=async ()=>{
      try{
const res=await axios.post("https://flexkart2.onrender.com/api/auth/products/filteredproducts",{checked,radio});
if(res.data.success===true){
  console.log(checked,radio);
setproducts(res.data.products);
console.log(res.data.products);
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
      if(radio.length>0 || checked.length>0){
        filteredproducts();
      }
       
        },[radio,checked])
    const handlefilter=(value,id)=>{
      let all=[...checked];
      if(value){
     all.push(id);
      }
      else{
      all=all.filter(c => c!==id);
     
      }
      setchecked(all);
    }
return (

<>

<div className="mb-20">
<div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <img style={{height:"50vh" }} src={img1} alt="..." />
        <img style={{height:"45vh" }} src={img3} alt="..." />
        <img style={{height:"50vh" }} src={img2} alt="..." />
        
      </Carousel>
    </div>
    </div>
    <div style={{display:"flex" ,flexWrap:"wrap", marginBottom:"30px"}}>
    <div style={{width :"30vh", height:"60vh",  marginRight:"50px", marginLeft:"40px",  marginBottom:"60px"}}>
    
     
     <div style={{height:"45%",  }}>
      <h1>Filter by Category</h1>
      {
categories.map((c)=>{
  return (
    <>
      <div>
      <input className = "ml-1 mr-2" type="checkbox" key={c._id} onChange={(e)=>{
          handlefilter(e.target.checked,c._id)
        }}/>
        <label for="scales">{c.name}</label>
        
      </div>
    </>
  )
})

      }
     </div>
     
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
       <div className=" mx-10">
              <button onClick={()=>{window.location.reload()}} type="submit" className="w-30  text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Filter</button>
              </div>
    

    </div>
    <div style={{ width : "75%", height:"100%", }}>
    <h1   style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px" }}>All products </h1>
 
    <div style={{display:"flex",justifyContent:"space evenly",flexWrap:"wrap" , listStyleType: "square",width:"100%"}} >
                  
                    {

                        products.map((p)=>{
                            return(
                            <>
                          

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
                    <div style={{width:"100%",marginLeft:"50%"}}>
                      <h3 style={{color:"grey"}}>{products.length===0 ? "No such item found":"" }</h3>
                    </div>
                   
</div>
 
</div>

    </div>



<ToastContainer bodyClassName="toastBody"/>


</>



)
}
