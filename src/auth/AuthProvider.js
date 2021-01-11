import React, { useContext, useEffect, useState} from 'react';
import {LoginRequest} from "../request";

const AuthContext = React.useContext({});

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token){
            setIsAuthenticated(true);
            setAccessToken(token);
        }
    }, []);

    const login = async (email, password) => {
        const res = LoginRequest(email, password);
        if (res.ok){
            const token = res;
            setAccessToken(token);
            setIsAuthenticated(true)
            localStorage.setItem("jwt", token);
        } else {
            setAccessToken("");
            setIsAuthenticated(false);
        }
        return res;
    }

    const logout = () => {
        setAccessToken("");
        setIsAuthenticated(false);
        localStorage.removeItem("jwt");
        console.log("logout");
    }

    const value = {
    isAuthenticated,
    accessToken,
    login,
    logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
