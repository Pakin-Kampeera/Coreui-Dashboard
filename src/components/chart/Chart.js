import React, {useState} from 'react';
import {Bar, Pie, defaults} from 'react-chartjs-2';
import ReactWordcloud from 'react-wordcloud';
import {useSelector} from 'react-redux';
import barData from '../../Mock/barData';
import pieData from '../../Mock/pieData';
import words from '../../Mock/words';

const Chart = () => {
    const [radio, setRadio] = useState('showAll');
    // const setWord = useState('')[1];
    const role = useSelector((state) => state.auth.user.role);
    defaults.animation = false;

    const options = {
        rotations: 1,
        rotationAngles: [0, 0]
    };

    const table = {
        maintainAspectRatio: false
    };

    const changeValue = (e) => {
        setRadio(e.target.value);
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
                                <h3 className="card-title">Words Cloud</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div
                                        className="row"
                                        style={{width: '100%', margin: 'auto'}}
                                    >
                                        <div className="col-sm-6 d-flex justify-content-center justify-content-around">
                                            <div>
                                                <input
                                                    type="radio"
                                                    value="showAll"
                                                    checked={
                                                        radio === 'showAll'
                                                    }
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
                                        </div>
                                        <div className="col-sm-6 d-flex justify-content-center justify-content-around">
                                            <div>
                                                <input
                                                    type="radio"
                                                    value="nonStress"
                                                    checked={
                                                        radio === 'nonStress'
                                                    }
                                                    onChange={changeValue}
                                                />
                                                {'   '}Non-Stress
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    value="cantTell"
                                                    checked={
                                                        radio === 'cantTell'
                                                    }
                                                    onChange={changeValue}
                                                />
                                                {'   '}Can&apos;t tell
                                            </div>
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
                                    words={words}
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
