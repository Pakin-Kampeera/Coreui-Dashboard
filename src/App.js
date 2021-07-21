import React from 'react';
import {Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifiedEmail from './pages/VerifiedEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Main from './pages/main/Main';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
    return (
        <Switch>
            <PublicRoute exact path="/login">
                <Login />
            </PublicRoute>
            <PublicRoute exact path="/register">
                <Register />
            </PublicRoute>
            <PublicRoute exact path="/verified-email/:token">
                <VerifiedEmail />
            </PublicRoute>
            <PublicRoute exact path="/forgot-password">
                <ForgotPassword />
            </PublicRoute>
            <PublicRoute exact path="/reset-password/:token">
                <ResetPassword />
            </PublicRoute>
            <PrivateRoute path="/">
                <Main />
            </PrivateRoute>
        </Switch>
    );
}

export default App;
