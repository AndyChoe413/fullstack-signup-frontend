
//brings in all files to render to the dom
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./_base.css"
import App from './App';


//renders the dom from file tree through app component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

