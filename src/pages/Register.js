import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../components/index';
import * as AuthService from '../services/auth';

const Register = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const history = useHistory();

    const registerHandler = async (username, email, password) => {
        try {
            setAuthLoading(true);
            const {message} = await AuthService.register(
                username,
                email,
                password
            );
            toast.success(message);
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
            username: '',
            email: '',
            password: '',
            passwordRetype: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Username required'),
            email: Yup.string()
                .email('Invalid email address')
                .max(254, 'Must be 254 characters or less')
                .required('Email address required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Password required'),
            passwordRetype: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Confirm password required')
                .when('password', {
                    is: (val) => !!(val && val.length > 0),
                    then: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'Both passwords need to be the same'
                    )
                })
        }),
        onSubmit: (values) => {
            registerHandler(values.username, values.email, values.password);
        }
    });

    document.getElementById('root').classList = 'hold-transition register-page';

    return (
        <div className="register-box" style={{width: '600px'}}>
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Stress Analyze</b>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Register a new membership</p>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    {...formik.getFieldProps('username')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            {printFormError(formik, 'username')}
                        </div>
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

                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    {...formik.getFieldProps('passwordRetype')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            {printFormError(formik, 'passwordRetype')}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Button
                                    block
                                    type="submit"
                                    isLoading={isAuthLoading}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="pt-3">
                        <Link to="/login" className="text-center">
                            I am already a membership
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
