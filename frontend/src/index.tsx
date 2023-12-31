import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/globals.css";
import "./assets/css/notion.css";
import "./assets/css/paginate.css";
import App from './App';
import { AuthProvider } from "./store/auth-context";
import { ThemeProvider } from "./store/theme-context";
import { BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { AuthModalProvider } from './store/auth-modal-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AuthModalProvider>
            <App />
          </AuthModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
