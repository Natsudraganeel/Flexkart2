import {useState,useContext,createContext, useEffect} from 'react';  
const CartContext = createContext();
const CartProvider = ({children}) => {
    const [cart,setcart] = useState([]);
   useEffect(()=>{                                       

        const data=localStorage.getItem("cart");
        if(data){
            const parsed=JSON.parse(data);

            setcart(parsed)
        }
   },[])  


    return (
        <CartContext.Provider value={[cart,setcart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart=()=>                 

    useContext(CartContext);

export {CartProvider,useCart};