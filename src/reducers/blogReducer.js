import blogService from '../services/blogs'
import commentService from '../services/comments'

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
    case 'ADD_COMMENT':
      const newComment = action.data
      console.log('COMNE ',newComment)
      const blogToComment = state.find(b => b.id === newComment.blog)
      const commentedBlog = {...blogToComment, comments: blogToComment.comments.concat(newComment)}
      return state.map(blog =>
        blog.id !== newComment.blog ? blog : commentedBlog
      )
    case 'ADDNEW': 
      return [...state, action.data]
    case 'REMOVE_BLOG':
      const idr = action.data
      console.log('removed item id ', idr)
      return [...state.filter(blog => blog.id !== idr)]
      case 'REMOVE_COMMENT':
        const rbc = action.data
        console.log('removed blog id ', rbc.blog_id)
        console.log('removed comment id ', rbc.comment_id)
        const blogToChange = state.find(blog => blog.id === rbc.blog_id)
        const blogCommentToRemove = { 
          ...blogToChange, 
          comments: blogToChange.comments.filter(cm => cm.id !== rbc.comment_id)
        } 
        console.log('Changed BLOG: ',blogCommentToRemove)
          return state.map(blog =>
            blog.id !== rbc.blog_id ? blog : blogCommentToRemove
          )



       // return [...blog, ...blog.comments.filter(cm => cm.id !== rbc.comment_id)]
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

export const addComment = (commentObject) => {
  return async dispatch => {
    

    const newComment = await blogService.createComment(commentObject)
    dispatch({
    type: 'ADD_COMMENT',
    data: newComment,
  })
  }
}

export const removeComment = (blog_id, comment_id) => {
  return async dispatch => {
    const request = await commentService.removeComment(comment_id, blog_id)
    dispatch({
      type: 'REMOVE_COMMENT',
      data: { blog_id, comment_id }
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