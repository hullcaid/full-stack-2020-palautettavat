import React from 'react'
import ListItem from './ListItem'

const CountryList = ( {countries, handleButtonClick} ) => {
	return(
		<div>
			<ul>
				{countries.map(country => 
					<ListItem key={country.alpha3Code} name={country.name} handleClick={handleButtonClick}/>
				)}
			</ul>
		</div>
	)
}

export default CountryList