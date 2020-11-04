import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button, TextareaAutosize } from '@material-ui/core/'




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
            <TextareaAutosize value={newComment} aria-label="empty textarea" placeholder="write a comment here" onChange={(event) => setComment(event.target.value)} />
          </div>
          <div>
          <Button variant = "contained" color = "primary" type="submit">add</Button>
          </div>
        </form>
      </div>
    )
  }

export default CommentForm