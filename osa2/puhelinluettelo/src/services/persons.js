import axios from 'axios'
const dbUrl = '/api/persons'

const getAll = () => {
	const request = axios.get(dbUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(dbUrl, newObject)
	return request.then(response => response.data)
}

const remove = id => {
	return axios.delete(`${dbUrl}/${id}`)
}

const modify = (id, newObject) => {
	const request = axios.put(`${dbUrl}/${id}`,newObject)
	return request.then(response => response.data)
}

export default {getAll, create, remove, modify}