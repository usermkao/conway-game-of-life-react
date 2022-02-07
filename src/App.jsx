import './App.css';
import React, { useState, useCallback, useRef, useEffect } from "react";
import UseEffectExample from './components/UseEffectExample';
import TimerExample from './components/TimerExample';
import GridWorld from './components/GridWorld';

function App() {
  return (
    <>
      {/*<UseEffectExample></UseEffectExample>*/}
      {/*<TimerExample></TimerExample>*/}
      <GridWorld></GridWorld>
    </>
  )
}

export default App;
