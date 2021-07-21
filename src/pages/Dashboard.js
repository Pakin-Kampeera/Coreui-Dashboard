import React from 'react';
import {SmallBox, Chart, Table} from '../components/index';
import {useSelector} from 'react-redux';

const Dashboard = () => {
    const widget = useSelector((state) => state.dashboard.widget);
    const table = useSelector((state) => state.dashboard.table);
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
            dataField: 'time',
            text: 'Date',
            sort: true,
            editable: false
        },
        {
            dataField: 'labels',
            text: 'Labels',
            editable: false,
            formatter: (cell, row) => {
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
            <div className="row">
                {role === 'admin' && (
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={widget.users}
                            title="New Users"
                            type="info"
                            icon="ion-android-people"
                        />
                    </div>
                )}
                <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                    <SmallBox
                        count={widget.messages}
                        title="Messages"
                        type="success"
                        icon="ion-android-textsms"
                    />
                </div>
                <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                    <SmallBox
                        count={widget.stress}
                        title="Stress Overview"
                        type="warning"
                        icon="ion-sad"
                    />
                </div>
                <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                    <SmallBox
                        count={widget.nonStress}
                        title="Non-stress Overview"
                        type="danger"
                        icon="ion-happy"
                    />
                </div>
            </div>
            <hr />
            <Chart />
            <hr />
            {role === 'admin' && (
                <Table table={table} columns={columns} type="dashboard" />
            )}
        </div>
    );
};

export default Dashboard;
