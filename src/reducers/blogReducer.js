import blogService from '../services/blogs'

/*
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (blog) => {
  return {
    content: blog,
    id: getId(),
    votes: 0
  }
}
*/
const reducer = (state = [], action) => {


  switch(action.type){
    case 'ADDNEW': 
      return [...state, action.data]
    case 'REMOVE_BLOG':
      const idr = action.data
      console.log('removed item id ', idr)
      return [...state.filter(blog => blog.id !== action.data)]
    case 'INIT_BLOGS':
      return action.data
    case 'VOTE':
      const id = action.data.id
      console.log('RESPONSE', id)
      const blogToVote = state.find(n => n.id === id)
      const changedBlog = { 
        ...blogToVote, 
        likes: blogToVote.likes + 1
      } 
        return state.map(blog =>
          blog.id !== id ? blog : changedBlog
        )
        
    default:
    return state
  }
}


export const voteBlog = (blog) => {
  return async dispatch => {
    const votedBlog = await blogService.vote(blog)
    dispatch({
    type: 'VOTE',
    data: votedBlog,
  })
  }
}

export const createBlog = (newBlogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newBlogObject)
    dispatch({
    type: 'ADDNEW',
    data: newBlog,
  })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const req = await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  })
}
}


export default reducer