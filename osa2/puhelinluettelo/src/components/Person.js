import React from 'react'

const Person = ({id, name, number, handleDelete}) => {
	// console.log(handleDelete)
	return(<li>{name} {number} <button onClick={()=> handleDelete(id)}>Delete</button></li>)
}
	
export default Person 