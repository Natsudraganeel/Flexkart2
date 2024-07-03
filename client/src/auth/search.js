import {useState,useContext,createContext} from 'react';  //context api is used inoreder to use a global state
const SearchContext = createContext();
const SearchProvider = ({children}) => {
    const [search,setsearch] = useState({keyword:"",results:[]});



    return (
        <SearchContext.Provider value={[search,setsearch]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch=()=>                     //useSearch is a custom hook

    useContext(SearchContext);

export {SearchProvider,useSearch};