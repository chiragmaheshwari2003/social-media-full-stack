import { useState, createContext, useEffect } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    // console.log(currentUser);
    const login = async (inputs)=>{
            const res = await axios.post("http://localhost:8800/api/auth/login",inputs, {
                withCredentials : true,
            });
            // console.log(res);
            setCurrentUser(res.data);
    }

    useEffect(() =>{
        localStorage.setItem('user',JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    )
}