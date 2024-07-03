import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./Navbar"
import Register from "./Register";
import Login from  './Login';
import Pgnotfound from "./pagenotfound";
import Dashboard from "./User/dashboard";
import Allorders from "./User/Allorders";
import './index.css';
import { AppProvider } from "./auth/Auth";
import Home from "./Home";
import Forgot from "./forgotpassword";
import AdminDashboard from "./admin/Admindashboard";
import Createcategory from "./admin/Createcategory";
import Createproducts from "./admin/CreateProducts";
import Updateproducts from "./admin/Updateproducts";
import Allproducts from "./admin/Allproducts";
import Orders from "./admin/Orders";
import Footer from "./Footer";
import { SearchProvider } from "./auth/search";
import Search from "./Search";
import CartPage from "./Cartpage";
import Details from "./Details";
import { CartProvider } from "./auth/Cart";
import Cat from "./Categorynavbar";

function App() {
return <>
<AppProvider>
<SearchProvider>
<CartProvider>
 <BrowserRouter>
<Navbar/>

    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/category/:slug" element={<Cat/>}></Route>
    <Route path="/search" element={<Search/>}></Route>
    <Route  path="/details/:slug" element={<Details/>}></Route>
    <Route path="/forgotpassword" element={<Forgot/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/allorders" element={<Allorders/>}></Route>
      <Route path="/admin" element={<AdminDashboard/>}></Route>
     <Route path="/admin/create-category" element={<Createcategory/>}></Route>
     <Route path="/admin/create-products" element={<Createproducts/>}></Route>
         
     <Route path="/admin/allproducts" element ={<Allproducts/>}></Route>
     <Route path="/admin/updateproduct/:slug" element={<Updateproducts/>}></Route>
     <Route path="/admin/orders" element={<Orders/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/*" element={<Pgnotfound/>}></Route> 
    </Routes>
    <Footer/>
 </BrowserRouter>
 </CartProvider>
 </SearchProvider>
 </AppProvider>
    </>
}

export default App;
