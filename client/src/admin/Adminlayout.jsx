import { React } from "react";

import { NavLink } from "react-router-dom";

export default function Adminlayout(){

    return (
        <>
        
      
      <div className="admindiv mx-10 my-10  ">
         <div className="title  py-2 bg-blue-200 ">
          Admin panel
        </div>
        <div className="list  py-2 hover:bg-blue-700 hover:text-white ">
        <NavLink to="/admin/create-category" >Create category</NavLink>
        </div>
        <div className="list text-center py-2 hover:bg-blue-700 hover:text-white ">
          <NavLink to="/admin/create-products" >Create product</NavLink>
        </div>
        <div className="list  py-2 hover:bg-blue-700 hover:text-white ">
        <NavLink to="/admin/allproducts" >All Products</NavLink>
        </div>
        <div className="list  py-2 hover:bg-blue-700 hover:text-white ">
        <NavLink to="/admin/orders" >Orders</NavLink>
        </div>
      </div>
      
  </>)
    
      

}