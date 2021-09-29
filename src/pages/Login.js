import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {Button} from '../components/index';
import {useDispatch} from 'react-redux';
import {authAction} from '../store/reducer/authReducer';
import * as AuthService from '../services/auth';
import * as Yup from 'yup';

const Login = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const loginHandler = async (email, password) => {
        try {
            setAuthLoading(true);
            const data = await AuthService.login(email, password);
            localStorage.setItem('token', data.token);
            dispatch(authAction.login({}));
            document.getElementById('root').classList.remove('login-page');
            document.getElementById('root').classList.remove('hold-transition');
            toast.success('Login success!', {theme: 'colored'});
            setAuthLoading(false);
            history.push('/');
        } catch (error) {
            setAuthLoading(false);
            toast.error(
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    'Failed',
                {theme: 'colored'}
            );
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email address required'),
            password: Yup.string().required('Password required')
        }),
        onSubmit: (values) => {
            loginHandler(values.email, values.password);
        }
    });

    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Stress Analyze</b>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">
                        Sign in to start your session
                    </p>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="email"
                                    className={`form-control ${
                                        formik.touched.email &&
                                        formik.errors.email &&
                                        'border border-danger'
                                    }`}
                                    placeholder="Email"
                                    {...formik.getFieldProps('email')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <div style={{color: 'red'}}>
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="password"
                                    className={`form-control ${
                                        formik.touched.password &&
                                        formik.errors.password &&
                                        'border border-danger'
                                    }`}
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <div style={{color: 'red'}}>
                                        {formik.errors.password}
                                    </div>
                                )}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Button
                                    block
                                    type="submit"
                                    isLoading={isAuthLoading}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                    <p className="mb-1 pt-3">
                        <Link to="/forgot-password">Forgot password</Link>
                    </p>
                    <p className="mb-0 pt-1">
                        <Link to="/register" className="text-center">
                            Register a new membership
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
