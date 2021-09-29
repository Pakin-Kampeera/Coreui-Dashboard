import React, {useState} from 'react';
import {Bar, Pie, defaults} from 'react-chartjs-2';
import {useSelector} from 'react-redux';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const Chart = () => {
    const [radio, setRadio] = useState('showAll');
    const role = useSelector((state) => state.auth.user.role);
    const widget = useSelector((state) => state.dashboard.widget);
    const stress = useSelector((state) => state.dashboard.stress);
    const nonStress = useSelector((state) => state.dashboard.nonStress);
    const average = useSelector((state) => state.dashboard.average);
    defaults.animation = false;

    const options = {
        rotations: 1,
        rotationAngles: [0, 0],
        fontSizes: [30, 60],
        enableTooltip: true
    };

    const table = {
        maintainAspectRatio: false
    };

    const changeValue = (e) => {
        setRadio(e.target.value);
    };

    const pieData = {
        labels: ['Stress', 'Non-stress', "Can't tell"],
        datasets: [
            {
                label: '# of Votes',
                data: [widget.stress, widget.nonStress, widget.cantTell],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const barData = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [
            {
                label: 'Stress',
                data: average.mapStress,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Non-stress',
                data: average.mapNonStress,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: "Can't tell",
                data: average.mapCantTell,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    };

    const word = () => {
        if (radio === 'showAll') {
            return [...stress, ...nonStress];
        } else if (radio === 'stress') {
            return stress;
        } else if (radio === 'nonStress') {
            return nonStress;
        } else {
            return [];
        }
    };

    return (
        <>
            <div className="row">
                <div className={`col-xl-${role === 'admin' ? 4 : 6}`}>
                    <div className="card card-success">
                        <div className="card-header">
                            <h3 className="card-title">Pie Chart</h3>
                        </div>
                        <div className="card-body">
                            <Pie
                                style={{
                                    minHeight: '250px',
                                    height: '276.5px',
                                    maxHeight: '276.5px',
                                    maxWidth: '100%'
                                }}
                                data={pieData}
                            />
                        </div>
                    </div>
                </div>

                <div className={`col-xl-${role === 'admin' ? 4 : 6}`}>
                    <div className="card card-success">
                        <div className="card-header">
                            <h3 className="card-title">
                                Average Stress Overtime
                            </h3>
                        </div>
                        <div className="card-body">
                            <Bar
                                style={{
                                    minHeight: '250px',
                                    height: '276.5px',
                                    maxHeight: '276.5px',
                                    maxWidth: '100%'
                                }}
                                data={barData}
                                options={table}
                            />
                        </div>
                    </div>
                </div>
                {role === 'admin' && (
                    <div className="col-xl-4">
                        <div className="card card-success">
                            <div className="card-header">
                                <h3 className="card-title">Word Cloud</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div
                                        className="row d-flex justify-content-center justify-content-around"
                                        style={{width: '100%', margin: 'auto'}}
                                    >
                                        <div>
                                            <input
                                                type="radio"
                                                value="showAll"
                                                checked={radio === 'showAll'}
                                                onChange={changeValue}
                                            />
                                            {'   '}Show all
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                value="stress"
                                                checked={radio === 'stress'}
                                                onChange={changeValue}
                                            />
                                            {'   '}Stress
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                value="nonStress"
                                                checked={radio === 'nonStress'}
                                                onChange={changeValue}
                                            />
                                            {'   '}Non-Stress
                                        </div>
                                    </div>
                                </form>
                                <ReactWordcloud
                                    style={{
                                        minHeight: '250px',
                                        height: '250px',
                                        maxHeight: '250px',
                                        maxWidth: '100%'
                                    }}
                                    scale="log"
                                    options={options}
                                    words={word()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Chart;
