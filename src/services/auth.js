import axios from '../utils/axios';

export const login = async (email, password) => {
    const {data} = await axios.post(
        'api/auth/login',
        {email, password},
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    localStorage.setItem('token', data.token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');

    return data;
};

export const register = async (username, email, password) => {
    const {data} = await axios.post(
        '/api/auth/register',
        {username, email, password},
        {
            header: {
                'Content-Type': 'application/json'
            }
        }
    );

    return data;
};

export const forgotPassword = async (email) => {
    const {data} = await axios.post(
        'api/auth/forgot-password',
        {email},
        {
            header: {
                'Content-Type': 'application/json'
            }
        }
    );

    return data;
};

export const resetPassword = async (params, password) => {
    const {data} = await axios.put(
        `api/auth/reset-password/${params.token}`,
        {password},
        {
            header: {
                'Content-Type': 'application/json'
            }
        }
    );

    return data;
};

export const verifiedEmail = async (params) => {
    const {data} = await axios.put(`api/auth/verified-email/${params.token}`);
    return data;
};
