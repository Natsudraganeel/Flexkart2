
import { useSearch } from "./auth/search";
import { useCart } from "./auth/Cart";
import { useAuth } from "./auth/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export default function Search(){
      const [cart,setcart]=useCart();
      const [auth,setauth]=useAuth();
    const [search,setsearch]=useSearch();
    const nav=useNavigate();
    
const settingcart=(p)=>{
   // console.log(cart);
    if(p.quantity===0){
          toast.error("currently not available", {
                                               position: "top-right",
                                               }) 
                                               return ;
     }
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
return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
    <h3>{search.results.length>0 ? "Found "+search.results.length :" No such item found"}</h3>
    </div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        
{

                        search.results.map((p)=>{
                            return(
                            <>
                          

<div style={{width:"18rem"}} className="  mx-2.5 my-2.5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
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
              <button onClick={()=>{nav(`/details/${p.slug}`)}} type="submit" className="w-30 text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">More Details</button>
              </div>
              <div className="mb-10 ml-3.5 mr-2.0">
              <button onClick={()=>{settingcart(p)}} type="submit" className="w-30 text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add to cart</button>
              </div>
              </div>
</div>


    </>)
                        })
                    }
        </div>
         <ToastContainer bodyClassName="toastBody"/>
    </>
)
}
