import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'bootstrap/dist/css/bootstrap.css'

import App from './app/App'

import reportWebVitals from './reportWebVitals'
import { Router } from 'react-router-dom'
import { store } from './app/store/store'
import { Provider } from 'react-redux'
import history from './app/common/history'


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
