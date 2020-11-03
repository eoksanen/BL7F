import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteBlog, removeBlog} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import Togglable from './Togglable';
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
  import Button from '@material-ui/core/Button'

  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@material-ui/core'

const Blog = ({ showRemoveButton }) => {

  const handleRemoveOf = async (blog) => {


    const removedTittle = blog.title

    dispatch(removeBlog(blog.id))
    dispatch(setNotification(`you removed ${removedTittle} blog `, 7))

     // blogService.remove(id)
    //  setBlogs(blogs.filter(n => n.id !== id))      
  }


  
  const ToggleCommentForm = () => (
    <Togglable buttonLabel='add a new comment'>
    <CommentForm blogId = {blog.id} />
</Togglable>
    )


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
    <h1 id="nameofblog" > {blog.title}</h1>
    <a href = {blog.url}>{blog.url}</a>
    <div>{blog.likes}</div>  
    <div>likes <Button color="primary" onClick={ () => dispatch(voteBlog(blog))}>Like</Button></div>
    <div>adden by {blog.author} </div>
    <br></br>
    <div>
    <h3>comments</h3>  

    
            <TableContainer component={Paper}>
              <Table>
                <TableBody>            
                  {blog.comments.map(cm => (
                    <TableRow key={cm.id}>
                      <TableCell>
                        {cm.comment}
                      </TableCell>
                      <TableCell>
                        remove
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
          </Table>
          </TableContainer>      
        </div>
        <div><ToggleCommentForm /></div>
    <div><Button style = {showRemoveButton} onClick={() => handleRemoveOf(blog)}>Remove</Button></div>

    
  </div>
  )
}
export default Blog
