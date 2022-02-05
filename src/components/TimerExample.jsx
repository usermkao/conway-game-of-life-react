import React, { useEffect, useState, useRef } from 'react';

function TimerExample() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const id = useRef(null);

    const clear = () => {
        setIsRunning(false);
        window.clearInterval(id.current);
    };

    const start = () => {
        if (isRunning) {
            return;
        }
        setIsRunning(true);
        id.current = window.setInterval(() => {
            setTime((c) => c + 1);
        }, 1000)
    }

    useEffect(() => {
        id.current = window.setInterval(() => {
            setTime((c) => c + 1);
            console.log(id);
        }, 1000)

        //return clear;  //Question: not sure why tutorial wanted 'return clear' here
    }, []);

    return (
        <>
            <h1>{time}</h1>
            <button onClick={start}>Start Timer</button>
            <button onClick={clear}>Stop Timer</button>
        </>
    );
}

export default TimerExample;