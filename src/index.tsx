import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NameContext from './contexts/name';
import ThemeContext from './contexts/theme';
import UserContext from './contexts/user';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <NameContext>
      <ThemeContext>
        <UserContext>
          <App />
        </UserContext>
      </ThemeContext>
    </NameContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
