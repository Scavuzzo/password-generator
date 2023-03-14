import React from 'react';
import logo from './logo.svg';
import 'styles/globals.css';
import 'styles/reset.scss';
import PassGen from 'components/generador-claves';

function App() {
  return (
    <div className="App">
      <PassGen/>
    </div>
  );
}

export default App;
