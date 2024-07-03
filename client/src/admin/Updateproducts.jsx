import { React ,useState,useEffect} from "react";
import axios from "axios";
import Adminlayout from "./Adminlayout";
import Spinner from "../spinner";
import { useAuth } from "../auth/Auth";
import { NavLink,Link,useParams ,useNavigate} from "react-router-dom";
import {Select} from "antd"
export default function Updateproducts(){
  const [auth,setauth]=useAuth();
  const nav=useNavigate();
  const params=useParams();
  const {Option}=Select;
  const [categories,setcategories]=useState([]);
  const [category,setcategory]=useState({});
  const [cat,setcat]=useState("");
  const [name,setname]=useState("");
  const [price,setprice]=useState("");
  const [quantity,setquantity]=useState("");
  const [description,setdescription]=useState("");
  const [shipping,setshipping]=useState("");
  const [photo,setphoto]=useState("");
  const [id,setid]=useState("");

 const getsingleproduct=async()=>{
    try{
const res=await axios.get(`http://localhost:3000/api/auth/products/get-product/${params.slug}`);
//console.log(res.data);
setname(res.data.product.name);
setprice(res.data.product.price);
setcat(res.data.product.category);
setdescription(res.data.product.description);
setquantity(res.data.product.quantity);
setcategory(res.data.cat);
setshipping(res.data.product.shipping);
setid(res.data.product._id);

    }
    catch(err){
        console.log(err.message);
    }
 }
 useEffect(()=>{
getsingleproduct();
 },[])

// const getsinglecategorybyid=async()=>{
//     try{
//         console.log(category);
//     const res=await axios.get(`http://localhost:3000/api/auth/category/singlecategory/${category}`);
// console.log(res.data);
//     }
//     catch(err){
//         console.log(err.message);
//     }
// }
// useEffect(()=>{
// getsinglecategorybyid()
// },[])

  const getallcategories=async()=>{  
    const resi=await axios.get("http://localhost:3000/api/auth/category/getallcategories")
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
  const handledelete=async(e)=>{
    e.preventDefault();
    try{
    const res=await axios.delete(`http://localhost:3000/api/auth/products/delete-product/${id}`);
    if(res.data.success===true){
    //  alert("deleted");
      nav("/admin/allproducts");
    }
    else{
    //  alert("not deleted");
    }
  }
  catch(err){
    alert(err.message);
  }
  }
  const handleupdate=async(e)=>{
    e.preventDefault();
    const productData=new FormData();
    productData.append("name",name);
    productData.append("description", description);
    productData.append("price",price);
    productData.append("category",cat);
    productData.append("quantity",quantity);
    productData.append("shipping",shipping);
    photo && productData.append("image",photo);
    
      
    try{
      // console.log(photo,
      //   name,
      //   description,
      //   price,
      //   cat,
      //   quantity,
      //   shipping ,id)
      const response=await axios.put(`http://localhost:3000/api/auth/products/update-product/${id}`,productData)
      //console.log(response.data);
   if(response.data.success===true){
 //   alert("fine");
    nav("/admin/allproducts");
   }
   else{
  //  alert(" not fine");
   }
     
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
              <h1 style={{ fontSize:"35px",marginBottom:"20px" }}>Update Products</h1>
              <div className="my-10 ">
                <Select value={ cat ? cat :category.name}  placeholder="Select a category" showSearch className=" form-select mb-3 w-full" onChange={(value)=>{setcat(value)}}>
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
                {photo ? (
                    <div >
                  <img height={"200px"} src={URL.createObjectURL(photo)} />
                  </div>
                )
                :
                ( <div>
                    <img height={"200px"}  src= {`http://localhost:3000/api/auth/products/get-image/${id}`}  alt={id}/>
                    </div>)
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
            <Select value={shipping ? "Yes" : "No"} placeholder="Set shipping"  className=" form-select mb-3 w-full" onChange={(value)=>{setshipping(value)}}>
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>

            </div>
          
             
              </div>
              <div style={{display:"flex", justifyContent:"space-around"}}>
              <div className="mb-10">
              <button onClick={handleupdate} type="submit" className="w-40 text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
              </div>
              <div className="mb-10">
              <button onClick={handledelete}  type="submit" className="w-40 text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Delete</button>
              </div>
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