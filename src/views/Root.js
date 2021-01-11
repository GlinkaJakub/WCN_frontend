import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ButtonJS from "../components/atoms/ButtonJS";
import Navbar from "../components/molecules/Navbar";
// import Table  from "../components/molecules/Table";
// import Pagination from "../components/atoms/Pagination";
// import DataTable from "../components/molecules/DataTable";
import Main from './Main';
import ProtectedRoute from "../components/atoms/ProtectedRoute";
// import Login from "./Login";
import Login2 from "./Login2";
import Register from './Register';
import AddGroup from "./AddGroup";
import Groups from "./Groups";
import {AuthProvider} from "../auth/AuthProvider";
import {CssBaseline} from "@material-ui/core";

// const auth = false;

const Root = () => (
    <>
        <AuthProvider>
            <Navbar />
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <ProtectedRoute exact path="/addGroup" component={AddGroup} />
                    <ProtectedRoute exact path="/groups" component={Groups} />
                    {/*<Route exact path="/login" component={Login} />*/}
                    <Route exact path="/login" component={Login2} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
        {/*<DataTable />*/}
        {/*<Table />*/}
        {/*<Pagination />*/}
        {/*<ButtonJS>click</ButtonJS>*/}
        {/*<DataTable />*/}
        {/*<Login />*/}
    </>
);

export default Root;
