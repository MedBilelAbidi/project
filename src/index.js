import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// styles

import './index.css';
import './App.scss'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
