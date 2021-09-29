import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {Link, useParams, useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import {Button} from '../components/index';
import * as Yup from 'yup';
import * as AuthService from '../services/auth';

const ResetPassword = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const params = useParams();
    const history = useHistory();

    const resetPasswordHandler = async (password) => {
        try {
            setAuthLoading(true);
            const {message} = await AuthService.resetPassword(params, password);
            toast.success(message, {theme: 'colored'});
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
            password: '',
            passwordRetype: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Password required'),
            passwordRetype: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Confirm password required')
                .when('password', {
                    is: (val) => !!(val && val.length > 0),
                    then: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'Both password need to be the same'
                    )
                })
        }),
        onSubmit: (values) => {
            resetPasswordHandler(values.password);
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
                        You are only one step a way from your new password,
                        recover your password now.
                    </p>
                    <form onSubmit={formik.handleSubmit} noValidate>
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
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type="password"
                                    className={`form-control ${
                                        formik.touched.passwordRetype &&
                                        formik.errors.passwordRetype &&
                                        'border border-danger'
                                    }`}
                                    placeholder="Confirm password"
                                    {...formik.getFieldProps('passwordRetype')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            {formik.touched.passwordRetype &&
                                formik.errors.passwordRetype && (
                                    <div style={{color: 'red'}}>
                                        {formik.errors.passwordRetype}
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
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-3 mb-1">
                        <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
