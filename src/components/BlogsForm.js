import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'


const NewBlog = () => {
  const dispatch = useDispatch()

  
  const addBlog = async (event) => {
    event.preventDefault()
    const content = event.target.blog.value
    event.target.blog.value = ''
  
    //props.createBlog(content)
    dispatch(createBlog(content))
    //dispatch(NotificationChange(['notificationShow','New blog created with following content: ' + content]))

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