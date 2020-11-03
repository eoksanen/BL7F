import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import reducer from '../reducers/blogReducer'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from '@material-ui/core/Button'



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
                Title
          <input
                id="title"
                type="text"
                value={newTitle}
                name="Title"
                onChange={(event) => setTitle(event.target.value)}
          />
          </div>
          <div>
              Author
          <input
                id="author"
                type="text"
                value={newAuthor}
                name="Author"
                onChange={(event) => setAuthor(event.target.value)}
            />
            </div>
            <div>
                Url
            <input
                id="url"
                type="text"
                value={newUrl}
                name="Url"
                onChange={(event) => setUrl(event.target.value)}
            />
            </div>
            <Button variant="contained" color="primary"  type="submit">save</Button>
        </form>
      </div>
    )
  }

export default BlogForm