import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({children, ...rest}) => {
    const isLogin = useSelector((state) => state.auth.isLogin);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isLogin ? (
                    children
                ) : (
                    <Redirect
                        to={{pathname: '/login', state: {from: {location}}}}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
