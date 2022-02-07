import React, { useEffect, useState, useRef } from 'react';
import Produce from 'immer';

const NUM_ROWS = 25;
const NUM_COLS = 25;
const GRID_SIZE = 10;
const INTERVAL = 250;

function GridWorld() {
    const [grid, setGrid] = useState(() => {
        let rows = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            rows.push([]);
            for (let j = 0; j < NUM_COLS; j++) {
                rows[i].push(false)
            }
        }
        return rows;
    });

    const [simFrame, setSimFrame] = useState(0);
    const [isSimRunning, setIsSimRunning] = useState(false);

    const id = useRef(null);

    const start = () => {
        CalculateSim(simFrame);
        if (isSimRunning) {
            return;
        }
        setIsSimRunning(true);
        id.current = window.setInterval(() => {
            setSimFrame((c) => { return c + 1; });
        }, INTERVAL)
    }

    const stop = () => {
        setIsSimRunning(false);
        window.clearInterval(id.current);
    };

    useEffect(start, [simFrame]);

    const positions = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1]
    ];

    function CalculateSim(frame) {
        //make deep copy
        let deepCopy = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            deepCopy.push([]);
            for (let j = 0; j < NUM_COLS; j++) {
                deepCopy[i].push(grid[i][j]);
            }
        }

        //loop through all grid positions
        for (let i = 0; i < NUM_ROWS; i++) {
            for (let j = 0; j < NUM_COLS; j++) {
                let liveCellsCount = 0;
                //loop through positions
                for (let index = 0; index < positions.length; index++) {
                    if (i + positions[index][0] > 0 && i + positions[index][0] < NUM_ROWS) {
                        const indexToEval = grid[i + positions[index][0]][j + positions[index][1]];
                        if (indexToEval === true) {
                            liveCellsCount += 1;
                        }
                    }
                }

                if (grid[i][j] === true) {
                    if (liveCellsCount < 2) {
                        deepCopy[i][j] = false;
                    }
                    else if (liveCellsCount === 2 || liveCellsCount === 3) {
                        deepCopy[i][j] = true;
                    }
                    else if (liveCellsCount > 3) {
                        deepCopy[i][j] = false;
                    }
                }
                else {
                    if (liveCellsCount === 3) {
                        deepCopy[i][j] = true;
                    }
                }
            }
        }
        setGrid(deepCopy);
    }

    return (
        <>
            <h1>{simFrame}</h1>
            <span>
                <button onClick={start}>Start</button>
                <button onClick={stop}>Stop</button>
            </span>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${NUM_COLS}, ${GRID_SIZE}px)`
            }}>
                {grid.map((row, i) => {
                    return row.map((row, j) => <div
                        key={`${i}-${j}`}
                        style={{
                            width: `${GRID_SIZE}px`,
                            height: `${GRID_SIZE}px`,
                            backgroundColor: grid[i][j] ? 'orangered' : 'white',
                            border: 'solid 1px black'
                        }}
                        onClick={() => {
                            const gridDeepCopy = Produce(grid, gridCopy => {
                                gridCopy[i][j] = !grid[i][j];
                            });
                            setGrid(gridDeepCopy);
                        }}
                    ></div>)
                })}
            </div>
        </ >
    );
}

export default GridWorld