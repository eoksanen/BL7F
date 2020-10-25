import React from 'react'
import store from './store'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import './index.css';
import App from './App'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'


//const store = createStore(notificationReducer)


ReactDOM.render(  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))