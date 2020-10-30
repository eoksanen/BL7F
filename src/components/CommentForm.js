import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'



const CommentForm = ({blogId}) => {

  const dispatch = useDispatch()

  const [newComment, setComment] = useState('') 

  const createComment = (event) => {
    event.preventDefault()

    const commentObject = 
    {
    comment: newComment,
    blog_id: blogId
    }


      dispatch(addComment(commentObject))    
      setComment('')      
    } 
  
   
    return (
      <div>
        <h3>add a comment</h3>
  
        <form onSubmit={createComment}>
            <div>
          <textarea
                id="blogComment"
                type="text"
                value={newComment}
                name="Comment"
                rows="3"
                cols="30"
                onChange={(event) => setComment(event.target.value)}
          />
          </div>
          <div>
            </div>
          <button className="blogList" type="submit">add</button>
        </form>
      </div>
    )
  }

export default CommentForm