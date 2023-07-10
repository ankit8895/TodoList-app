//import react
import React from 'react';
//import ReactDOM
import ReactDOM from 'react-dom/client';
//import Provider
import { Provider } from 'react-redux';
//import store
import store from './redux/store';
//import bootstrap.min.css file for theme
import './bootstrap.min.css';
//import stylesheet
import './index.css';
//import App component
import App from './App';
import reportWebVitals from './reportWebVitals';

//create entry point of the project
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
