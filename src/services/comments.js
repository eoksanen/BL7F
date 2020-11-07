import axios from 'axios'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const removeComment = (comment_id, blog_id) => {

    const config = {
      headers: { Authorization: token },
    }
  
    const request = axios.delete(`../api/comments/${blog_id}/${comment_id}`, config)
    return request.then(response => response.data)
  }

  export default { setToken, removeComment }