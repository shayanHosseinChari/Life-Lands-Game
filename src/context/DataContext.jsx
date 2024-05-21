import { createContext } from "react";

export const DataContext = createContext();


const DataContextProvider = ({ children }) => {
    return (
        <DataContext.Provider value={videoCategoryItem}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;