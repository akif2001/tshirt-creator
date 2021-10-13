import React from 'react';
import logo from './logo.svg';
import './App.css';

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

const { editor, onReady } = useFabricJSEditor();
const onAddCircle = () => {
  editor?.onAddCircle();
}

const onAddRectangle = () => {
  editor?.onAddRectangle();
}

const App = () => {

  return (
    <div className="App">
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}

export default App;
