import React from 'react'
import CountriList from './CountryList'
import CountryInfo from './CountryInfo'

const Result = ({ countries, filterValue }) => {
	if (countries.length === 0){
		console.log('Countries empty')
		return <div></div>
	}
	
	const filtered = countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()))
	console.log('filtered: ',filtered.length)
	if (filtered.length > 10) {
		return(<div>Too many matches, specify another filter</div>)
	}
	else if (filtered.length > 1 ) {
		return(<CountriList countries={filtered} />)
	}
	else if (filtered.length === 0){
		return(<div>No countries match the filter</div>)
	}
	return(<CountryInfo country={filtered[0]}/>)
}

export default Result