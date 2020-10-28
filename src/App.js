import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import ShowName from './components/ShowName'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable';
import PropTypes from 'prop-types'
import { setNotification } from './reducers/notificationReducer'
import NotificationR from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, removeBlog, voteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login, logout, setUser } from './reducers/loginReducer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
 // const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

/*
  useEffect(() => { 
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort( (a,b)=> b.likes - a.likes ))
    )  
  }, [])
  */

  const dispatch = useDispatch()
  
  useEffect(() => {
    blogService
      .getAll().then(blgs => dispatch(initializeBlogs(blgs)))   
    userService
      .getAll().then(usrs => dispatch(initializeUsers(usrs)))  
    },[])

    const blogs = useSelector(state => state.blogs)
    blogs.sort( (a,b)=> b.likes - a.likes )
    let loggedUser = useSelector(state => state.login)

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  if (loggedUserJSON) {
    loggedUser = JSON.parse(loggedUserJSON)
    dispatch(setUser(loggedUser))
    blogService.setToken(loggedUser.token)

  }
}, [])

const messageSetter =(errorMessage, errorStyle) => {
    
  setMessage([errorMessage,
    errorStyle
  ])
setTimeout(() => {
  setMessage([null])
}, 5000)
  console.log(errorMessage)

}


  const handleLogin = async (event) => {
    event.preventDefault()

      dispatch(login(username, password))
      setNotification('welcome ',5)

            
    
    setNotification('welcome ',5)
  }


  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
  else{
    return (
    
      <div className={message[1]}>
        {message[0]}
      </div>
    )
  }
}

  const loginForm = () => {


    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (

      <div>
        <div style={hideWhenVisible}>
        <h2>Log in to application</h2>
        <Notification message={message} />
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
        <LoginForm    
          handleSubmit ={handleLogin} 
          username = {username} 
          password = {password}
          handleUsernameChange = {({ target }) => setUsername(target.value)} 
          handlePasswordChange = {({ target }) => setPassword(target.value)}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>


      </div>

     )
    }
    const blogForm = () => (
    <Togglable buttonLabel='add a new blog'>
    <BlogForm  />
</Togglable>

    )

 

 if(loggedUser){   
  if(loggedUser.name === undefined){loggedUser.name = "su"}
 }

 const padding = {
  padding: 5
}

  return (

    <div>
      <table className='menu'>
        <tbody>
          <tr>
            <td><Link style={padding} to="/">Home</Link></td>
            <td><Link style={padding} to="/blogs">blogs</Link> </td>
            <td> <Link style={padding} to="/users">users</Link></td>
            <td>      
              {loggedUser === null ?
              loginForm() :  <p style={padding}>{loggedUser.name} logged in</p>}
            </td>
            <td> 
              <button onClick = {() => { 
                dispatch(logout())
                }}>Log Out</button>
            </td>
          </tr>
        </tbody>
      </table>

        <div>
      
      
     

      
    </div>

      <h1>Blogs</h1>
      <Notification message={message} />
      <NotificationR  />


      <div>

       
        {blogForm()}
      </div>
    


    
 
    <Switch>
    <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
        <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
      </Switch>
  
 
  <br></br>

</div>
  )
}

export default App