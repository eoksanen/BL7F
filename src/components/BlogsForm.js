import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'


const NewBlog = () => {
  const dispatch = useDispatch()

  
  const addBlog = async (event) => {
    event.preventDefault()
    const content = event.target.blog.value
    event.target.blog.value = ''
  
    //props.createBlog(content)
    dispatch(createBlog(content))
    dispatch(setNotification(`New blog created with following content: ${content}`, 5))

  } 

  return (
    <div>
    <h2>create new</h2>
        <form onSubmit={addBlog}>
            <div><input name="blog" /></div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default NewBlog