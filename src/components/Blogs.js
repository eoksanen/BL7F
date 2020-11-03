import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'



const Blogs = () => {


    
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

    const blogs = useSelector(state => state.blogs)


    return (

      <TableContainer component={Paper}>
        <Table>
          <TableBody>            
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                </TableCell>
                <TableCell>
                  {`${blog.likes} likes`}
                </TableCell>
                <TableCell>
                  {blog.url}
                </TableCell>
              </TableRow>
            ))}
     </TableBody>
     </Table>
     </TableContainer>
    )
}
export default Blogs