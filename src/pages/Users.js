import React, {useEffect, useState} from 'react';
import {Table} from '../components/index';
import {useDispatch, useSelector} from 'react-redux';
import {usersAction} from '../store/reducer/userReducer';
import {Type} from 'react-bootstrap-table2-editor';
import {toast} from 'react-toastify';
import {authAction} from '../store/reducer/authReducer';
import axios from '../utils/axios';

const Users = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.user.account);
    const [isLoading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState([]);
    const [adminRole, setAdminRole] = useState([]);

    const columns = [
        {
            dataField: 'username',
            text: 'Username',
            editable: false
        },
        {
            dataField: 'email',
            text: 'Email',
            editable: false
        },
        {
            dataField: 'createdAt',
            text: 'Created',
            editable: false,
            formatter: (cell, row) => {
                return (
                    <span>{new Date(row.createdAt).toLocaleDateString()}</span>
                );
            }
        },
        {
            dataField: 'updatedAt',
            text: 'Time',
            sort: true,
            editable: false,
            formatter: (cell, row) => {
                return (
                    <span>{new Date(row.createdAt).toLocaleTimeString()}</span>
                );
            }
        },
        {
            dataField: 'role',
            text: 'Role',
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 'user',
                        label: 'user'
                    },
                    {
                        value: 'admin',
                        label: 'admin'
                    }
                ]
            }
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: {user}
                } = await axios.get('/api/data/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(user);
                dispatch(usersAction.setUserRoles({account: user}));
            } catch (error) {
                toast.error(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        'Failed',
                    {theme: 'colored'}
                );
                dispatch(authAction.logout());
            }
        };
        fetchData();
    }, [dispatch, isLoading]);

    const changeRoleHandler = async (e) => {
        e.preventDefault();
        if (userRole.length !== 0 || adminRole.length !== 0) {
            try {
                setLoading(true);
                const {data} = await axios.put(
                    '/api/data/users',
                    {
                        adminID: adminRole,
                        userID: userRole
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                toast.success(data.message, {theme: 'colored'});
                setLoading(false);
                setUserRole([]);
                setAdminRole([]);
            } catch (error) {
                toast.error(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        'Failed',
                    {theme: 'colored'}
                );
                dispatch(authAction.logout());
            }
        }
    };

    const beforeSaveCell = async (oldValue, newValue, row) => {
        if (adminRole.includes(row._id) && oldValue === 'user') {
            setAdminRole((prevState) =>
                prevState.filter((id) => id !== row._id)
            );
        }

        if (userRole.includes(row._id) && oldValue === 'admin') {
            setUserRole((prevState) =>
                prevState.filter((id) => id !== row._id)
            );
        }

        if (oldValue !== newValue && newValue === 'user') {
            setUserRole((prevState) => [...prevState, row._id]);
        }

        if (oldValue !== newValue && newValue === 'admin') {
            setAdminRole((prevState) => [...prevState, row._id]);
        }
    };

    return (
        <div className="container-fluid">
            <Table
                table={JSON.parse(JSON.stringify(accounts))}
                columns={columns}
                type="users"
                changeRoleHandler={changeRoleHandler}
                isLoading={isLoading}
                userRole={userRole}
                adminRole={adminRole}
                beforeSaveCell={beforeSaveCell}
            />
        </div>
    );
};

export default Users;
