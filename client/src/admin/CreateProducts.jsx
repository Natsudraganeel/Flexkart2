import { React ,useState,useEffect} from "react";
import axios from "axios";
import Adminlayout from "./Adminlayout";
import Spinner from "../spinner";
import { useAuth } from "../auth/Auth";
import { NavLink,Link,useNavigate } from "react-router-dom";
import {Select} from "antd"
export default function Createproducts(){
  const [auth,setauth]=useAuth();
  const {Option}=Select;
  const [categories,setcategories]=useState([]);
  const [category,setcategory]=useState({});
  const [name,setname]=useState("");
  const [price,setprice]=useState("");
  const [quantity,setquantity]=useState("");
  const [description,setdescription]=useState("");
  const [shipping,setshipping]=useState("");
  const [photo,setphoto]=useState("");
  const nav=useNavigate();
  const getallcategories=async()=>{  
    const resi=await axios.get("https://flexkart2.onrender.com/api/auth/category/getallcategories")
 if(resi.data.success===true){
   //console.log(resi.data.categories)
   setcategories(resi.data.categories)
   
  
 }
 else{
   console.log("error")
 }
 }
 useEffect(()=>{
  getallcategories();
 
  },[])
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const productData=new FormData();
    productData.append("name",name);
    productData.append("description", description);
    productData.append("price",price);
    productData.append("category",category);
    productData.append("quantity",quantity);
    productData.append("shipping",shipping);
    productData.append("image",photo);
    
      
    try{
      // console.log(photo,
      //   name,
      //   description,
      //   price,
      //   category,
      //   quantity,
      //   shipping )
      const response=await axios.post("https://flexkart2.onrender.com/api/auth/products/create-product",productData)
   
    // alert(response.data.message);
     nav("/admin/allproducts");
    }
    catch(err){
alert(err.message);
console.log(err.message);
    }
  }
return (
  <pre>{
    auth.user!==null && auth.user.role===1 ?(
    <div className="flex flex-wrap" >
              <Adminlayout/>
              <form className="w-1/2 mx-20" >
              <div className="my-10 ">
                <Select    placeholder="Select a category" showSearch className=" form-select mb-3 w-full" onChange={(value)=>{setcategory(value)}}>
                {
                  categories?.map((c)=>{
                    return (
                    <>
                    <Option key={c._id} value={c._id}>
{c.name}
</Option>
</>)
                  }
                  )
                }
                </Select>
                <div className="my-3">
                <label type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">  
                {photo ? photo.name :"Upload Image"}
                <input  style={{display:"none"}} accept="images/*" type="file" onChange={(e)=>setphoto(e.target.files[0])}/>
                </label>
              
                </div>
                <div className="my-2">
                {photo &&
                  <img src={URL.createObjectURL(photo)} />
                }
               
                </div>
                
                <div className="my-8">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name of the product</label>
              <input value={name} onChange={(e)=>{
                setname(e.target.value)
              }} type="text" name="name"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
            </div>
            <div className="my-8">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Description of the product</label>
              <textarea value={description} onChange={(e)=>{
                setdescription(e.target.value)
              }} type="text" name="description"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
            </div>
            <div className="my-8">
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Quantity of the product</label>
              <input value={quantity} onChange={(e)=>{
                setquantity(e.target.value)
              }} type="number" name="quantity"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
            </div>
            <div className="my-8">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Price of the product</label>
              <input value={price} onChange={(e)=>{
                setprice(e.target.value)
              }} type="number" name="price"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
            </div>
            <div>
            <Select placeholder="Set shipping"  className=" form-select mb-3 w-full" onChange={(value)=>{setshipping(value)}}>
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>

            </div>
          
             
              </div>
              <div className="mb-10">
              <button onClick={handlesubmit} type="submit" className="w-40 text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
              </div>
              </form>
              
    </div>
    ):
    (
      <Spinner/>
    )
  }
  </pre>




)



}
