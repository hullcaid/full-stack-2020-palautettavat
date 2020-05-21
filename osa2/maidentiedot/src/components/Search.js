import React from 'react'

const Search = ({input, handleInputChange}) => {

	return(
		<div>
			find countries <input value={input} onChange={handleInputChange}/>
		</div>
	)
} 

export default Search