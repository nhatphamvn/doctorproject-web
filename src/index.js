import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../src/redux/store";
import AppRouter from "./routes/AppRouter";
import "./input.css";
import { PersistGate } from "redux-persist/integration/react";
import LanguageProvider from "./features/Language/providers/LanguageProvider";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <LanguageProvider>
          <React.StrictMode>
            <AppRouter />
          </React.StrictMode>
        </LanguageProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
