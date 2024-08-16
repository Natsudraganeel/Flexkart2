import {React,useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "./auth/Cart";
import { useAuth } from "./auth/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner";
export default function CartPage(){
    const [cart,setcart]=useCart();
    const [auth,setauth]=useAuth(); 
    const lekh=JSON.parse(localStorage.getItem("cart"));
    //console.log(lekh)
    const [cost,setcost]=useState(()=>{let total=0;
     lekh?.map((item)=>{total=total+item.pro.price*item.value}); return total} );
    const nav=useNavigate();
    const [clienttoken,setclienttoken]=useState("");
    const [instance,setinstance]=useState("");
    const [loading,setloading]=useState(false);
   
/*/const totalprice=()=>{

    let total=0;
   cart.map((item)=>{total=total+item.value*item.pro.price})
    console.log(total);
    setcost(total);
    return total;
}*/
const setplus=(p)=>{
    const ans=[...cart];
    const item=ans.find((item=> item.pro._id===p._id));
    const index=ans.findIndex((item=> item.pro._id===p._id));
    if(item.pro.quantity>item.value){
        
        ans[index]={pro:item.pro,value:item.value+1};
        setcost(cost+item.pro.price);
        
        setcart(ans);
        localStorage.setItem("cart",JSON.stringify(ans))   
        
    }
   
  

}

const setminus=(p)=>{
    const ans=[...cart];
    const item=ans.find((item=> item.pro._id===p._id));
    const index=ans.findIndex((item=> item.pro._id===p._id));
    if(item.value>1){
    ans[index]={pro:item.pro,value:item.value-1};
    setcost(cost-item.pro.price);
    setcart(ans);
    localStorage.setItem("cart",JSON.stringify(ans));
    }
    
}
    const removecartitem=(pid)=>{
        const ans=[...cart];
        const item=ans.find((item=> item.pro._id===pid));
        const index=ans.findIndex((item=> item.pro._id===pid));
        ans.splice(index,1);
        setcart(ans);
        setcost(cost-item.pro.price*item.value)
        localStorage.setItem("cart",JSON.stringify(ans));

    }
    // get clienttoken
    const getclienttoken=async()=>{
        try{
        const res=await axios.get("https://flexkart2.onrender.com/api/auth/products/product/token");
        console.log(res.data.clientToken);
        setclienttoken(res.data.clientToken);

        }
    catch(err){
        console.log(err);
    }
    };
    useEffect(()=>{
getclienttoken();
    },[auth?.token]);

    const handlepayment=async()=>{
        
        try{
            
        setloading(true);
const {nonce}= await instance.requestPaymentMethod();
const res=await axios.post("https://flexkart2.onrender.com/api/auth/products/product/payment",{cart,auth,nonce});
setloading(false);
setcart([]);
localStorage.removeItem("cart");
localStorage.removeItem("__paypal_storage__");
//alert("success");
nav("/");
        }
        catch(err){
            console.log(err);
            setloading(false);
        }
    }
    return (
        <pre>{
      auth.user!==null && auth.user.role===0 ? (
    <div >
    <div className="text-center my-10">
        <h1  style={{marginLeft:"30px" ,fontSize:"35px",marginBottom:"20px" }}>Your Cart </h1>
        <h3>{cart.length>0 ? `You have ${cart.length} items in your cart`: "Cart empty"}</h3>
        </div>
        <div className="flex flex-wrap">
        <div style={{width:"40%"}}>
  
        <div style={{marginLeft:"20px"}}>
        <h1 style={{marginLeft:"10px"}}>{cart.length>0? "Cart Items" :""}</h1>
        {
        cart.map((p)=>{
                return(
                    <>
                    <div style={{width:"20rem"}} className="  mx-2.5 my-2.5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
<div style={{display:"flex", justifyContent:"center"}}>
        <img  style={{width:"100px" ,height :"100px", marginTop:"10px" }}   src={`https://flexkart2.onrender.com/api/auth/products/get-image/${p.pro._id}`} alt={p.name} />
        </div>
    <div class="p-5">
        <h5>Name: {p.pro.name}</h5>
        <div className="flex flex-wrap">
        <p>Price:₹ {p.pro.price}</p>
        </div>

        <div >
        <h1>Quantity:</h1>
        <button style={{backgroundColor:"rgb(241, 237, 237)" ,
  height:"40px",
  width: "40px",
  borderRadius: "50%",
  margin:"5px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)" ,display:"inline"}} onClick={()=>{setminus(p.pro)}}><i className="fa fa-minus "></i></button>
<p style={{ display:"inline",marginLeft:"10px",marginRight:"10px"}}>{p.value}</p>
        <button style={{backgroundColor:"rgb(241, 237, 237)" ,
  height:"40px",
  width: "40px",
  borderRadius: "50%",
  margin:"5px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)"}} onClick={()=>{setplus(p.pro)}}><i className="fa fa-plus "></i></button>
        </div>
       
      
    </div>
    <div className="flex flex-wrap">
    <div className="mb-10 mx-3">
              <button onClick={()=>{nav(`/details/${p.pro.slug}`)}} type="submit" className="w-30 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">More Details</button>
              </div>
              <div className="mb-10 mx-3">
              <button onClick={()=>{removecartitem(p.pro._id)}}  type="submit" className="w-30 text-white bg-red-600 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Remove</button>
              </div>
            
              </div>
</div>
                    </>
                )
            })
            
                
            
        }
        </div>

        </div>
        <div style={{width:"80vh",marginLeft:"20px",paddingBottom:"50px"}}>
            <h1 style={ {fontSize:"25px"}}>Total Cost:₹ {cost}</h1>
            <h3 style={ {fontSize:"18px"}}>Your address:{auth.user.address}</h3>
            <div className="mt-10 mx-3">
              <button onClick={()=>{nav("/dashboard")}} type="submit" className="w-30 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={loading }>Update address</button>
              </div>
              <div style={{}}>
         {!clienttoken ? (""):
         (
            
             <>
          <DropIn
            options={{ authorization:clienttoken ,
            paypal:{
                flow:'vault',
            },
            }}
            onInstance={instance => setinstance(instance)}
            
            
          />
          <button  className="w-30 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handlepayment} >{loading ? "Processing..." : "Make Payment"}</button>
          </>
          
         )}
         </div>
      
        </div>
        </div>
        <ToastContainer bodyClassName="toastBody"/>
    </div>
      )
      :(
      <Spinner/>
      )
        }
      </pre>

    )

    

}
