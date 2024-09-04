
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReportPage } from './components/ReportPage';
import { ContributePage } from './components/Contribute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/report" element={<ReportPage/>} />
        <Route path="/contribute" element={<ContributePage/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();