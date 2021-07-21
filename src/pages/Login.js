import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import * as AuthService from '../services/auth';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../components/index';
import {useDispatch} from 'react-redux';
import {authAction} from '../store/reducer/authReducer';

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
            toast.success('Login success!');
            setAuthLoading(false);
            history.push('/');
        } catch (error) {
            setAuthLoading(false);
            toast.error(
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    'Failed'
            );
        }
    };

    const printFormError = (formik, key) => {
        if (formik.touched[key] && formik.errors[key]) {
            return <div style={{color: 'red'}}>{formik.errors[key]}</div>;
        }
        return null;
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
        <div className="login-box" style={{width: '600px'}}>
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
                                    className="form-control"
                                    placeholder="Email"
                                    {...formik.getFieldProps('email')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{color: 'red'}}>
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            {printFormError(formik, 'password')}
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
