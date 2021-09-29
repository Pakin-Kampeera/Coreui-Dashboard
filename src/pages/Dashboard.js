import React from 'react';
import {SmallBoxes, Chart, Table} from '../components/index';
import {useSelector} from 'react-redux';

const Dashboard = () => {
    const role = useSelector((state) => state.auth.user.role);

    const columns = [
        {
            dataField: 'username',
            text: 'Username',
            sort: true,
            editable: false
        },
        {
            dataField: 'message',
            text: 'Message',
            sort: true,
            editable: false
        },
        {
            dataField: 'createdAt',
            text: 'Date',
            sort: true,
            editable: false,
            formatter: (_, row) => {
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
            formatter: (_, row) => {
                return (
                    <span>{new Date(row.createdAt).toLocaleTimeString()}</span>
                );
            }
        },
        {
            dataField: 'labels',
            text: 'Labels',
            editable: false,
            sort: true,
            formatter: (_, row) => {
                if (row.labels === 'non-stress') {
                    return (
                        <span className="badge badge-success">non-stress</span>
                    );
                } else if (row.labels === 'stress') {
                    return <span className="badge badge-danger">stress</span>;
                }
                return <span className="badge badge-warning">can't tell</span>;
            }
        },
        {
            dataField: 'confidence',
            text: 'Confidence score',
            sort: true,
            editable: false
        }
    ];

    return (
        <div className="container-fluid">
            <SmallBoxes />
            <hr />
            <Chart />
            <hr />
            {role === 'admin' && <Table columns={columns} type="dashboard" />}
        </div>
    );
};

export default Dashboard;
