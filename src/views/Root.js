import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ButtonJS from "../components/atoms/ButtonJS";
import Navbar from "./Navbar";
// import Table  from "../components/molecules/Table";
// import Pagination from "../components/atoms/Pagination";
// import DataTable from "../components/molecules/DataTable";
import ProtectedRoute from "../components/atoms/ProtectedRoute";
// import Login from "./Login";
import Login2 from "./Login2";
import Register from './Register';
import AddGroup from "./AddGroup";
import Groups from "./Groups";
import {CssBaseline} from "@material-ui/core";
import {LoginRequest} from "../request";
import TableMaterial from "../components/atoms/TableMaterial";
import ChangePassword from "./ChangePassword";

const Root = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const user = localStorage.getItem("user");
        if (token){
            setIsAuthenticated(true);
            setAccessToken(token);
            setUserEmail(user);
        } else {
            setIsAuthenticated(false);
            setAccessToken("");
            setUserEmail("");
        }
    }, []);

    useEffect(() => {
        console.log("isAuthenticated in Root: ", isAuthenticated)
    }, [isAuthenticated]);

    const login = async (values, history, setErrorMessage) => {
        const res = await LoginRequest(values);
        console.log("status: ", res.status);
        if (res.ok){
            const token = res.headers.get("Authorization");
            const user = values.email;
            console.log("new: ", token);
            console.log("new: ", user);
            setAccessToken(token);
            setIsAuthenticated(true)
            setUserEmail(user);
            localStorage.setItem("jwt", token);
            localStorage.setItem("user", user);
            history.push("/groups");
        } else if (res.status === 401){
            setErrorMessage("Błąd logowania: ", res.status);
        }
        return res;
    }

    const logout = () => {
        setAccessToken("");
        setIsAuthenticated(false);
        setUserEmail("");
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        console.log("logout");
    }

    return (
        <>
                <Navbar isAuthenticated={isAuthenticated} logout={logout} user={userEmail}/>
                <CssBaseline/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={() => <TableMaterial isAuthenticated={isAuthenticated} />}/>
                        <ProtectedRoute exact path="/addGroup" isAuthenticated={isAuthenticated} component={() => <AddGroup isAuthenticated={isAuthenticated}/>}/>
                        <ProtectedRoute exact path="/changePassword" isAuthenticated={isAuthenticated} component={() => <ChangePassword isAuthenticated={isAuthenticated}/>}/>
                        <ProtectedRoute exact path="/groups" isAuthenticated={isAuthenticated} component={() => <Groups isAuthenticated={isAuthenticated} accessToken={accessToken} user={userEmail} />}/>
                        {/*<Route exact path="/login" component={Login} />*/}
                        <Route exact path="/login" component={() => <Login2 login={login} />}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </BrowserRouter>
            {/*<DataTable />*/}
            {/*<Table />*/}
            {/*<Pagination />*/}
            {/*<ButtonJS>click</ButtonJS>*/}
            {/*<DataTable />*/}
            {/*<Login />*/}
        </>
    );
};

export default Root;
