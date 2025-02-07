import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "../src/redux/store";
import Layout from './layout';
import './input.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter> {/* Bọc Layout trong BrowserRouter */}
      <React.StrictMode>
        <Layout />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
