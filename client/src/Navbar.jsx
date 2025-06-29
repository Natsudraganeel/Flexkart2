import React, { useState ,useEffect} from "react"
import { NavLink, useNavigate } from "react-router-dom";
import img1 from "./images/icon.jpeg"
import { useAuth } from "./auth/Auth";
import { useSearch } from "./auth/search";
import { useCart } from "./auth/Cart";
import axios from "axios"
export default  function Navbar() {
// the drop down menu button is taken from flowbite and rest of the dropdown taken from w3schools
    const parent = {
        position:"relative",
      };
      const child={
        backgroundColor:"rgb(29 78 216)",
        width:"33px",
        height:"34px",
         position:"absolute",
         top:"1px",
         right:"1px",
         cursor:"pointer",
         borderRadius:"4px"
      }
      const icon={
        color:"white"
      }
      const [mobile,setmobile]=useState(false);
      const [cart,setcart]=useCart();
      const[search,setsearch]=useSearch();
      const [auth,setauth]=useAuth();
      const [categories,setcategories]=useState([]);
      const nav=useNavigate();
      const getallcategories=async()=>{
        try{
      const res=await axios.get("https://flexkart2.onrender.com/api/auth/category/getallcategories");
      if(res.data.success===true){
        setcategories(res.data.categories)
        console.log(res.data.categories);
      }
        }
        catch(err){
          alert(err.message)
        }
      }
      useEffect(()=>{
        getallcategories();
       
        },[])
      function handlelogout(){
        setauth({
          ...auth,
          user:null,
          token:"",
        })
        localStorage.removeItem("auth");
        setcart([]);
        localStorage.removeItem("cart");
        localStorage.removeItem("__paypal_storage__");

      }
const handlesubmit=async(e)=>{
e.preventDefault();
try{
  console.log(search.keyword);
const res=await axios.get(`https://flexkart2.onrender.com/api/auth/products/searchproduct/${search.keyword}`);
if(res.data.success===true){
  setsearch({...search,results:res.data.products});
  console.log(search.keyword);
nav("/search");
}
else{
  console.log("backend pblm");
}
}
catch(err){
console.log(err.message)
}
}

    return (
        <nav className="mb-20 z-10">
  <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex  space-x-3 ">
      <img src={img1} className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FlexKart</span>
    </div>
      
    <form  style={{width:"40%"}} onSubmit={handlesubmit}>
        <div style= {parent} >
        <input
         type="text"
        className="  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
        placeholder="Search FlexKart " value={search.keyword} onChange={(e)=>{setsearch({...search,keyword:e.target.value})}} />
        <button style={child}><i className="fa fa-search" style={icon}></i></button>
        </div>
        </form>
        <button onClick={()=>{setmobile(!mobile)}} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
  <span className="sr-only">Open main menu</span>
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
  </svg>
</button>

    <div className={mobile===false ? "hidden w-full md:block md:w-auto" : " w-full md:block md:w-auto"} id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4    md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    
       
        <li>
          <NavLink to="/" className=" block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Home</NavLink>
        </li>{
        !auth.user ? (
          <>
          <li>
          <NavLink to="/register" className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</NavLink>
        </li>
        </>) :
         (
        
          <>
     <div className="dropdown">
     <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-center inline-flex items-center " type="button">{auth.user.role==0 ? auth.user.name : "Admin"}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

  <div className="dropdown-content">
  <div>
  <NavLink to={"/"+(auth.user.role===1 ? "admin" : "dashboard")} className="dropdown-item block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</NavLink>
  </div>
  <div>
  <NavLink to="/" onClick={handlelogout} className="dropdown-item block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</NavLink>
  </div></div>
</div>
    
          </>
        )
        
        }
      
        <div className="dropdown">
     <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-center inline-flex items-center " type="button">Categories<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

  <div className="dropdown-content">
 {
  categories.map((c)=>{
    return (
  <>
    <NavLink to = {`/category/${c.slug}`}  className="z-20 dropdown-item block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{c.name}</NavLink>
    </>   )})
 }
  </div>
</div>
     
        <li>
        <div className="flex" >
        <i class="fa fa-shopping-cart" style={{width:"30px" ,fontSize:"25px"}}></i>
          <NavLink to="/cart" className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart ({cart.length})</NavLink>
          </div>
        </li>
      </ul>
    </div>
    
   { /*<i class="fa fa-bars hamburger " style={{fontSize:"24px"}}></i>*/}
  </div>
</nav>

    )

    }
    
        
