import React, { useState, useEffect } from 'react';
import '../App.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let timer;
        if (running) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!running) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [running]);

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    const handleLap = () => {
        if (time === 0) return
        setLaps([...laps, time]);
    };

    const handleReset = () => {
        if (time === 0) return
        setRunning(false);
        setTime(0);
        setLaps([]);
    };

    return (

        <div className="stopwatch-container bg-yellow-100">
            <h2 className='text-5xl font-medium text-pink-700 mb-4'>Stopwatch</h2>
            <div className="stopwatch-display">
                <span>{formatTime(time)}</span>
            </div>
            <div className="stopwatch-buttons">
                <button onClick={() => setRunning(true)} className="start">Start</button>
                <button onClick={() => setRunning(false)} className="stop" >
                    Stop                </button>
                <button onClick={handleLap} className="lap">Lap</button>
                <button onClick={handleReset} >
                    <  svg xmlns="http://www.w3.org/2000/svg" className="reset" width={40} height={40} viewBox="0 0 24 24" ><g fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}><path d="M12 3a9 9 0 1 1-5.657 2"></path><path d="M3 4.5h4v4"></path></g></svg>
                </button>
            </div>
            <div className="lap-times">
                <h3 className='font-semibold text-pink-700 pb-3 text-xl'>Lap Times</h3>
                {laps.map((lap, index) => (
                    <div key={index} className="lap-time">
                        Lap {index + 1}: {formatTime(lap)}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Stopwatch;
