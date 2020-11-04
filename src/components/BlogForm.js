import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import reducer from '../reducers/blogReducer'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'



const BlogForm = () => {

  const dispatch = useDispatch()

  const [newTitle, setTitle] = useState('') 
  const [newAuthor, setAuthor] = useState('') 
  const [newUrl, setUrl] = useState('') 


  const addBlog = (event) => {
    event.preventDefault()



    const newBlog = 
      {
      title: newTitle,
      author: newAuthor,
      url: newUrl
      }

      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} created`, 4))
      
      setTitle('')
      setAuthor('')
      setUrl('')

      
    } 
  
   
    return (
      <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={addBlog}>
            <div>
              <TextField value={newTitle} label = "Title" onChange={(event) => setTitle(event.target.value)}></TextField><br></br>
              <TextField value={newAuthor} label = "Author" onChange={(event) => setAuthor(event.target.value)} ></TextField><br></br>
              <TextField value={newUrl} label = "Url" onChange={(event) => setUrl(event.target.value)} ></TextField>
            </div>
            <Button variant="contained" color="primary"  type="submit">save</Button>
        </form>
      </div>
    )
  }

export default BlogForm