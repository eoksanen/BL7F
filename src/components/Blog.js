import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteBlog, removeBlog} from '../reducers/blogReducer'
import { removeComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import Togglable from './Togglable'
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
    Typography,
  } from '@material-ui/core'

const Blog = ({ loggedUser }) => {

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
    <Typography variant="h4" color="secondary" gutterBottom>{blog.title}</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell> <a href = {blog.url}>{blog.url}</a></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Likes:</TableCell>
            <TableCell> <div>{blog.likes} Likes</div>  </TableCell>
            <TableCell><div><Button color="primary" onClick={ () => dispatch(voteBlog(blog))}>Like</Button></div></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">    <div>adden by {blog.author} </div></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
   
   
    

    <br></br>
    <div>
    <Typography variant="h5" color="textSecondary" gutterBottom>comments</Typography> 

    
            <TableContainer component={Paper}>
              <Table>
                <TableBody>            
                  {blog.comments.map(cm => (
                    <TableRow key={cm.id}>
                      <TableCell>
                        {cm.comment}
                      </TableCell>
                      <TableCell>
                      {loggedUser === null ? null :
                      <Button onClick={() => dispatch(removeComment(blog.id, cm.id))}>remove comment</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
          </Table>
          </TableContainer>      
        </div>
        <div><ToggleCommentForm /></div>
        {loggedUser === null ? null :
    <Button onClick={() => handleRemoveOf(blog)}>Delete blog</Button>}

    
  </div>
  )
}
export default Blog
