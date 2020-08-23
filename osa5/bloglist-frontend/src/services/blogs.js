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

const create = async newListing => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newListing, config)
  return response.data
}

const modify = async (updatedBlog, id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

export default { getAll, setToken, create, modify }