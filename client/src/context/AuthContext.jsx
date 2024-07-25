import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, SetcurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [ispopup, Setispopup] = useState(false);
    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8080/api/auth/signin", inputs, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(res.data);
        SetcurrentUser(res.data);
    }
    const signup=async(inputs)=>{
        const res = await axios.post("http://localhost:8080/api/auth/signup", inputs, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(res.data);
        SetcurrentUser(res.data);
    }
    const logout = async () => {
        const DA = await axios.get("http://localhost:8080/api/auth/logout", {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(DA);
        SetcurrentUser(null);
    }
    const verify = async () => {
      try {
        const verify = await axios.get("http://localhost:8080/api/auth/verify", {
            withCredentials: true,
            credentials: 'include'
        });
        return verify.data;
      } catch (err) {
        return null
      }

    }
    useEffect(() => {
        const fetchin=async()=>{
            const t=await verify();
            if(!t){
                SetcurrentUser("")
            }
            localStorage.setItem("user", JSON.stringify(currentUser));

        }
        fetchin()
    }, [currentUser])

    return (<AuthContext.Provider value={{ currentUser, login,signup, logout, ispopup, Setispopup }}>{children}</AuthContext.Provider>)

}