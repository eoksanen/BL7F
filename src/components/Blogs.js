import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



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

        <div>            
            {blogs.map(blog => {

  return (

    <div key={blog.id} style={blogStyle} className='blog'>
   <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
  </div>
    
     )})}
          </div>  )
}
export default Blogs