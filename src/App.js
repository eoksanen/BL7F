import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ShowName from './components/ShowName'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable';
import PropTypes from 'prop-types'
import { setNotification } from './reducers/notificationReducer'
import NotificationR from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, removeBlog, voteBlog } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/loginReducer'
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
    },[])

    const blogs = useSelector(state => state.blogs)
    let user = useSelector(state => state.login)

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    blogService.setToken(user.token)

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
/*
  const addBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      messageSetter(`a new blog added by ${user.name} `,'add')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      } catch (exception) {

        messageSetter('error','error')
      }
    /*
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        messageSetter(`a new blog added by ${user.name} `,'add')
      })*/
 // }

  const handleLikeOf = async (id) => {

    const blog = blogs.find(b => b.id === id)

    dispatch(voteBlog(blog))

    /*

    let rBlog = await  blogService.update(blog.id,{
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
    */
    //setBlogs(blogs.map(bl => bl.id !== blog.id ? bl : rBlog)) 
    dispatch(setNotification(`you voted ${blog.title}`, 6))
  }

  const handleRemoveOf = async (blog) => {


    const removedTittle = blog.title

    dispatch(removeBlog(blog.id))
    dispatch(setNotification(`you removed ${removedTittle} blog `, 7))

     // blogService.remove(id)
    //  setBlogs(blogs.filter(n => n.id !== id))      
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

 

 if(user){   
  if(user.name === undefined){user.name = "su"}
 }

  return (

    <div>

      <h1>Blogs</h1>
      <Notification message={message} />
      <NotificationR  />

    {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        <button onClick = {() => { 
      dispatch(logout())
      }}>Log Out</button>
        {blogForm()}
      </div>
    }
  
 
  <br></br>
{blogs.map(blog => {
  //console.log(blog)
  let removeButtonVisibility = null
  if(user && blog.user){  

    if( user.userID.localeCompare(blog.user.id) === 0 )     removeButtonVisibility  = true
    /*
    console.log('userid', user.userID)
    console.log('blog', blog.user.id)
  console.log('removebutton visibility: ',removeButtonVisibility)*/
}
    

  return (
  <Blog key={blog.id} blog={blog} removeButtonVisibility={removeButtonVisibility} handleLike={() => handleLikeOf(blog.id)} handleRemove={() => handleRemoveOf(blog)}/>
)})}
</div>
  )
}

export default App