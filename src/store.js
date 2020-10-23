import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from './reducers/notificationReducer'

//import anecdoteService from './services/anecdotes'



const reducer = combineReducers({
  notification: notificationReducer
 
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

/*
anecdoteService.getAll().then(anecdotes =>
   {
    console.log('BACK',anecdotes)
    store.dispatch(initializeAnecdotes(anecdotes))
  }
)
*/


export default store