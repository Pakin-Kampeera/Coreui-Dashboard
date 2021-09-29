import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import SmallBox from './small-box/SmallBox';
import {io} from 'socket.io-client';

const SmallBoxes = () => {
    const role = useSelector((state) => state.auth.user.role);
    const [widget, setWidget] = useState(
        useSelector((state) => state.dashboard.widget)
    );

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BASE_URL);

        socket.on('connect', () => {
            console.log(`Frontend socket: ${socket.id}`);
        });

        socket.on('newWidget', (value) => {
            console.log('newWidget');
            console.log(value);
            setWidget({
                users: value.users || widget.users,
                messages: value.messages || widget.messages,
                stress: value.stress || widget.stress,
                nonStress: value.nonStress || widget.nonStress,
                cantTell: value.cantTell || widget.cantTell
            });
        });

        socket.on('disconnect', () => {
            console.log('diconnected');
        });

        return () => socket.removeAllListeners();
    }, [widget]);

    return (
        <div className="row">
            {role === 'admin' && (
                <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                    <SmallBox
                        count={widget.users || 0}
                        title="Total Users"
                        type="info"
                        icon="ion-android-people"
                    />
                </div>
            )}
            <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                <SmallBox
                    count={widget.messages || 0}
                    title="Messages"
                    type="success"
                    icon="ion-android-textsms"
                />
            </div>
            <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                <SmallBox
                    count={widget.stress || 0}
                    title="Stress Overview"
                    type="warning"
                    icon="ion-sad"
                />
            </div>
            <div className={`col-lg-${role === 'admin' ? 3 : 4} col-6"`}>
                <SmallBox
                    count={widget.nonStress || 0}
                    title="Non-stress Overview"
                    type="danger"
                    icon="ion-happy"
                />
            </div>
        </div>
    );
};

export default SmallBoxes;
