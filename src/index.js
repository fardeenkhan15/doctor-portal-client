import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
