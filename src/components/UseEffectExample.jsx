import React, { useEffect, useState } from 'react';

//NOTES

//order of hooks and return

//  return
//  useEffect

//things to be aware of

//  passing empty array as 2nd param to useEffect makes it run once
//  passing array with useState vars makes it run everytime those vars get updated
//  passing nothing will cause useEffect to fire after every return (rerender)

function UseEffectExample() {
    const [count, setCount] = useState(0);
    const [countBy10, setCountBy10] = useState(0);

    useEffect(() => { console.log('use count effect', count) }, [count]);
    useEffect(() => { console.log('use countBy10 effect', countBy10) }, [countBy10]);
    useEffect(() => { console.log('use effect fired once if passing empty array as 2nd param') }, [])

    return (
        <>
            {console.log('return')}
            <h1>{count}</h1>
            <h1>{countBy10}</h1>
            <button onClick={() => setCount(count + 1)}>Set Count</button>
            <button onClick={() => setCountBy10(countBy10 + 10)}>Set Count By 10</button>
        </>
    );
}

export default UseEffectExample;