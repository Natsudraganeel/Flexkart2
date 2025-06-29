import  React,{useState ,useEffect} from "react";
import Modal from "./Modal";
import axios from "axios";
import Adminlayout from "./Adminlayout";
import Spinner from "../spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../auth/Auth";
import { NavLink,Link } from "react-router-dom";
export default function Createcategory(){
  const [auth,setauth]=useAuth();
  const [category,setcategories]=useState([]);
  const [createcat,setcreatecat]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [newname,setnewname]=useState({});
//   const openForm=()=>{
//     setShowForm(true);
// }

const closeForm=()=>{
  setShowForm(false);
}

  const getallcategories=async()=>{  
     const resi=await axios.get("https://flexkart2.onrender.com/api/auth/category/getallcategories",{
    headers: {
      Authorization: auth.token,
    },
  })
  if(resi.data.success===true){
   // console.log(resi.data.categories)
    setcategories(resi.data.categories);
   
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
    try{
    const rest=await axios.post("https://flexkart2.onrender.com/api/auth/category/create-category",
  {
    name:createcat
  },{
    headers: {
      Authorization: auth.token,
    }
  })
  //console.log(rest.data)
  if(rest.data.success===true){
       alert(rest.data.message)
       window.location.reload();
     getallcategories();
    //alert(rest.data.message);
  }
  else{
    //alert(rest.data.message);
       toast.error(rest.data.message, {
                                      position: "top-right",
                                      }) 
  }
  
}
catch(err){
  alert("err occured")
}

  }
  const handledelete=async(rex)=>{

    try{
        const response=await axios.delete(`https://flexkart2.onrender.com/api/auth/category/delete-category/${rex._id}`,
          {
    headers: {
      Authorization: auth.token,
    }
  }
        );
    
    if(response.data.success===true){
      alert(response.data.message)
       window.location.reload();
      getallcategories();
     // alert(response.data.message)
    }
    else{
      //alert(response.data.message)
        toast.error(response.data.message, {
                                      position: "top-right",
                                      }) 
    }
   

    }
    catch(err){
     alert(err.message)
    }
  }
return (
  <pre>{
    auth.user!==null && auth.user.role===1 ?(
    <div className="flex flex-wrap" >
              <Adminlayout/>
              <div className="my-10 lg:w-1/3  mx-10">
                  <h1 style={{fontSize:"35px",marginBottom:"20px"}}>Manage Category</h1>
                  
                <form  onSubmit={handlesubmit} className="flex items-center max-w-sm  mb-10">   
  <label htmlFor="simple-search" className="sr-only">Search</label>
  <div className="relative w-full">
    <input onChange={(e)=>setcreatecat(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Category" required />
  </div>
  <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Submit
  </button>
</form>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Action</span>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Action</span>
        </th>
      </tr>
    </thead>
    <tbody>
    
      
      {
        category.map((c)=>{
          return <>
         
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
          
          <th key={c._id} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          
          {c.name}
        </th>
        
        <th className="px-6 py-4 text-right">
          <Link  onClick={()=>{setShowForm(true);setnewname(c)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
          {showForm && <Modal closeForm={closeForm} props={newname} />}
        </th>
        <th className="px-6 py-4 text-right">
          <Link  onClick={()=>{handledelete(c)}} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</Link>
        </th>
        </tr>
        </>
        })
        
    
      }
    
    </tbody>
  </table>
</div>


              </div>
              <ToastContainer bodyClassName="toastBody"/>
    </div>
    ):
    (
      <Spinner/>
    )
  }
  </pre>
    





)



}
