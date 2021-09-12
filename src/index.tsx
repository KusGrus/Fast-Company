import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'

import 'bootstrap/dist/css/bootstrap.css'
import FastCompany from './components/FastCompany'

ReactDOM.render(
    <React.StrictMode>
        <FastCompany />
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
