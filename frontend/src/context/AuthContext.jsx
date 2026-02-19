import { createContext, useState, useEffect, useContext } from "react";
import { login, signUp, logout, getProfile } from "../api/api";
import { notifySuccess, notifyError } from "../utils/notify";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });


    async function loginUser(username, password) {

        try {
            const data = await login({ username, password });
            if (data?.token) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                return true;
            }
            return false;
        } 
        catch (error) {
            return false;
        }
    }

    async function signUpUser(signUpData){
        try {
            const res = await signUp(signUpData);
            return res;
        } 
        catch (error) {
            return false;
        }
    }

    async function logoutUser(){
        try{
            await logout(token);
            localStorage.removeItem("token");
            setToken(null);
            return true;
        }
        catch(error){
            return false
        }
    }

    async function getUserProfile(){
        try{
            const userData = await getProfile(token);
            if (!userData) {
                throw new Error("Profilo non trovato")
            }
            return userData
        }
        catch(error){
            if (error.message === "SESSION_EXPIRED") {
                notifyError("Sessione scaduta, rifai il login")
                logoutUser();
            }
            return false
        }

    }


    

    return(
        <AuthContext.Provider
            value={{
                token,
                loginUser,
                signUpUser,
                logoutUser,
                getUserProfile
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}