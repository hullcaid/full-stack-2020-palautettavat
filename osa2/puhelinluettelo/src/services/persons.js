import axios from 'axios'
const dbUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(dbUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(dbUrl, newObject)
	return request.then(response => response.data)
}

export default {getAll, create}