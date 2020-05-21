import React from 'react'

const ListItem = ({name, handleClick}) => {
	console.info(name)
	console.info(handleClick)
	return (
		<li>{name} <button onClick={() =>handleClick({name})}>show</button></li>
		
	)
}

export default ListItem
