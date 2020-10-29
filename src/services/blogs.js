import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createComment = async (newCommentObject) => {
  console.log('newObject ', newCommentObject)

  const url = `${baseUrl}/${newCommentObject.blog_id}/comments`
  console.log('URL ', url)
  const response = await axios.post(url, newCommentObject)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updateObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, updateObject)

  return request.data
}

const vote = async (blog) => {
  const url = `${ baseUrl }/${blog.id}`
  const changedBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(url, changedBlog)
  return response.data
}


const remove = (id) => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then(response => response.data)
}
export default { getAll, create, update, setToken, remove, vote, createComment }