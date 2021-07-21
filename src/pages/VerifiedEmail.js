import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import * as AuthService from '../services/auth';

const VerifiedEmail = () => {
    const [isVerify, setIsVerify] = useState(false);
    const [message, setMessage] = useState(
        'Verify token has been expired, please register again'
    );

    const params = useParams();

    useEffect(() => {
        const verifiedEmail = async () => {
            try {
                const data = await AuthService.verifiedEmail(params);
                setMessage(data.message);
                setIsVerify(data.success);
                toast.success('🎉 Congrats!');
            } catch (error) {
                toast.error(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        'Failed'
                );
            }
        };
        verifiedEmail();
    }, [params]);

    document.getElementById('root').classList = 'hold-transition login-page';

    const btn = isVerify ? (
        <div className="card-body">
            <p className="login-box-msg">{message}</p>
            <Link to="/login">
                <button type="submit" className="btn btn-primary btn-block">
                    Go back to Login
                </button>
            </Link>
        </div>
    ) : (
        <div className="card-body">
            <p className="login-box-msg">{message}</p>
            <Link to="/register">
                <button type="submit" className="btn btn-primary btn-block">
                    Register again
                </button>
            </Link>
        </div>
    );

    return (
        <div className="login-box" style={{width: '600px'}}>
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Stress Analyze</b>
                    </Link>
                </div>
                {btn}
            </div>
        </div>
    );
};

export default VerifiedEmail;
