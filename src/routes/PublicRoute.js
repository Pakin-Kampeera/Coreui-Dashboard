import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PublicRoute = ({children, ...rest}) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const token = localStorage.getItem('token');
    const isAuthenticated = isLogin || token;

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    <Redirect to={{pathname: '/', state: {from: location}}} />
                ) : (
                    children
                )
            }
        />
    );
};

export default PublicRoute;
