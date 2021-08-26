import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'

import 'bootstrap/dist/css/bootstrap.css'
import api from './api'
import FastCompany from "./components/FastCompany"

const markedUsers = api.users.fetchAll().map(u => ({...u, mark: false}))

ReactDOM.render(
    <React.StrictMode>
        <FastCompany users={markedUsers}/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
