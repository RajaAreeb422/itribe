import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import ParentComponent from './Home_comp';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router
  
} from "react-router-dom";
 
ReactDOM.render(
<React.StrictMode>
<Router>
    <App />
    </Router>
</React.StrictMode>,
document.getElementById('root')
);