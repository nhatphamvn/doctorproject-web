import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "../src/redux/store";
import AppRouter from './routes/AppRouter';
import './input.css';
import LanguageProvider from './features/Language/providers/LanguageProvider'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <BrowserRouter>
      <LanguageProvider>
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
      </LanguageProvider> {/* Bọc Layout trong BrowserRouter */}
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
