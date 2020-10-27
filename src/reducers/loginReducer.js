import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {

    switch (action.type){
        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return null

        default:
            return state
    }
  }

    export const login = (username, password) => {
        return async dispatch => {

                 const user = await loginService.login({
                  username, password,
                })
                console.log('USER ',user)
          
                window.localStorage.setItem(
                  'loggedBlogappUser', JSON.stringify(user)
                )
                blogService.setToken(user.token)
            
            dispatch({
                type: 'LOGIN',
                data: user,
              })
        }
    }

    export const setUser = (user) => {
      return async dispatch => {
        dispatch({
          type: 'LOGIN',
          data: user,
        })
      }
    }

    export const logout = () => {
        return async dispatch => {
          console.log('LOGOUT')
          window.localStorage.removeItem('loggedBlogappUser')

              dispatch({
                type: 'LOGOUT',
                data: null,
              })
        }

    }

 
export default reducer

