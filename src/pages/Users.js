import React, {useEffect, useState} from 'react';
import {Table} from '../components/index';
import {useDispatch, useSelector} from 'react-redux';
import {usersAction} from '../store/reducer/userReducer';
import {Type} from 'react-bootstrap-table2-editor';
import {toast} from 'react-toastify';
import axios from '../utils/axios';
import {authAction} from '../store/reducer/authReducer';

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
            sort: true,
            editable: false
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            editable: false
        },
        {
            dataField: 'created',
            text: 'Created date',
            sort: true,
            editable: false
        },
        {
            dataField: 'role',
            text: 'Role',
            sort: true,
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 'admin',
                        label: 'admin'
                    },
                    {
                        value: 'user',
                        label: 'user'
                    }
                ]
            }
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get('/api/data/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                dispatch(usersAction.setUserRoles({account: data.user}));
            } catch (error) {
                toast.error(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        'Failed'
                );
                dispatch(authAction.logout());
            }
        };
        fetchData();
    }, [dispatch, isLoading]);

    const changeRoleHandler = async (e) => {
        e.preventDefault();

        // console.log('User Role: ' + userRole);
        // console.log('Admin Role: ' + adminRole);

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
                toast.success(data.message);
                setLoading(false);
                setUserRole([]);
                setAdminRole([]);
            } catch (error) {
                toast.error(
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        'Failed'
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
                table={accounts}
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
