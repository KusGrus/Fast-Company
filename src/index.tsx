import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'

import 'bootstrap/dist/css/bootstrap.css'
import api from './api'
import FastCompany from "./components/FastCompany"


ReactDOM.render(
    <React.StrictMode>
        <FastCompany users={api.users.fetchAll()}/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
