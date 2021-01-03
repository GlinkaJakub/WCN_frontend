import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("jwt").length > 7 ?
        <Component {...props} />
        :
            <Redirect to={{ pathname: '/login', state: {from: props.location }}} />
    )} />
);

export default ProtectedRoute;
