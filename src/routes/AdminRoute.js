import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AdminRoute = ({children, ...rest}) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const role = useSelector((state) => state.auth.user.role);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isLogin && role === 'admin' ? (
                    children
                ) : (
                    <Redirect to={{pathname: '/', state: {from: {location}}}} />
                )
            }
        />
    );
};

export default AdminRoute;
