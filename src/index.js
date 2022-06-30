import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import App from './App';
import {BASE_URL} from "./config";
import './index.css';


axios.defaults.baseURL = BASE_URL;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

