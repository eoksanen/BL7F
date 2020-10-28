import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteBlog, removeBlog} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
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

const Blog = ({ showRemoveButton }) => {

  const handleRemoveOf = async (blog) => {


    const removedTittle = blog.title

    dispatch(removeBlog(blog.id))
    dispatch(setNotification(`you removed ${removedTittle} blog `, 7))

     // blogService.remove(id)
    //  setBlogs(blogs.filter(n => n.id !== id))      
  }


  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  console.log('blogs ', blogs)


  const match = useRouteMatch('/blogs/:id')
  console.log('match ', match)
  const blog = match 
  ? blogs.find(blog => blog.id === match.params.id)
  : null

  if (!blog) {
      return null
    }


  console.log('finded blog ', blog)


  if (blog) {
          console.log(blog.title)
    }




  return (
  <div className='blog'>
    <h1> {blog.title}</h1>
    <a href = {blog.url}>{blog.url}</a>
    <div>{blog.likes}</div>  
    <div>likes <button onClick={ () => dispatch(voteBlog(blog))}>Like</button></div>
    <div>adden by {blog.author} </div>
    <div><button style = {showRemoveButton} onClick={() => handleRemoveOf(blog)}>REmove</button></div>
  </div>
  )
}
export default Blog
