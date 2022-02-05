import './App.css';
import React, { useState, useCallback, useRef, useEffect } from "react";
import UseEffectExample from './components/UseEffectExample';
import TimerExample from './components/TimerExample';

window.TIME = 0;

setInterval(function () { window.TIME += 1 }, 1000);

function App() {
  return (
    <>
      {/*UseEffectExample></UseEffectExample>*/}
      <TimerExample></TimerExample>
    </>
  )
}

export default App;
