import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as AuthService from '../services/auth';
import {Button} from '../components/index';

const ForgotPassword = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);

    const requestNewPassword = async (email) => {
        try {
            setAuthLoading(true);
            const {message} = await AuthService.forgotPassword(email);
            toast.success(message);
            setAuthLoading(false);
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

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email address required')
        }),
        onSubmit: (values) => {
            requestNewPassword(values.email);
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
                        You forgot your password? Here you can easily retrieve a
                        new password.
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
                    <p className="mb-1 pt-3">
                        <Link to="/Login">Go back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
