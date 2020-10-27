import React from 'react'
import store from './store'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import './index.css';
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'


//const store = createStore(notificationReducer)


ReactDOM.render(  <Provider store={store}>
  <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'))