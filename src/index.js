import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const myName = 'Dmytro';

ReactDOM.render(
  <React.StrictMode>
    <App name={myName} />
  </React.StrictMode>,
  document.getElementById('root')
);

