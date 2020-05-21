import React from 'react'

const Filter = ({filterValue, handleFilterChange}) => {
	return(
	<div>
      Filter names with <input
      value={filterValue}
      onChange={handleFilterChange}>
      </input>
	</div>

	)

}

export default Filter