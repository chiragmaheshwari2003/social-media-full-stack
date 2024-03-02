import { useState, createContext, useEffect } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
    // const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') || false);

    const toggle = ()=>{
        setDarkMode(!darkMode);
        // setDarkMode((darkMode) =>!darkMode);
    }

    useEffect(() =>{
        localStorage.setItem('darkMode',darkMode);
    },[darkMode])

    return (
        <DarkModeContext.Provider value={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    )
}