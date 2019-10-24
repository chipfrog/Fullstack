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
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async updatedBlog => {
  const blogsUrl = `${baseUrl}/${updatedBlog.id}`
  const response = await axios.put(blogsUrl, updatedBlog)
  return response.data
}
const deleteBlog = async blogToDelete => {
  const config = {
    headers: {Authorization: token}
  }
  const blogsUrl = `${baseUrl}/${blogToDelete.id}`
  const response = await axios.delete(blogsUrl, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog }