import {useState,useContext,createContext, useEffect} from 'react';  //context api is used inoreder to use a global state
const AppContext = createContext();
const AppProvider = ({children}) => {
    const [auth,setauth] = useState({user:null,token:""});
   useEffect(()=>{                                       // if we donot give useEffect , after page refresh the state data will be lost

        const data=localStorage.getItem("auth");
        if(data){
            const parsed=JSON.parse(data);// parse is used to convert JSON to javascript object

            setauth({
                ...auth,
                user:parsed.user,
                token:parsed.token    
            })
        }
   },[])  //[] is a dependency array , (if we give empty array then it will run only once)


    return (
        <AppContext.Provider value={[auth,setauth]}>
            {children}
        </AppContext.Provider>
    )
}

const useAuth=()=>                     //useAuth is a custom hook

    useContext(AppContext);

export {AppProvider,useAuth};