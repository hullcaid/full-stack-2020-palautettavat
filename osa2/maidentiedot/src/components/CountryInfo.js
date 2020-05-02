import React from 'react'

const CountryInfo = ({country}) => {
	console.log(country.name)
	return(
		<div>
			<h1>{country.name}</h1>
			<div>
				<div>capital {country.capital}</div>
				<div>population {country.population}</div>
			</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
			</ul>
			<img src={country.flag} alt='flag' height="100"/>
		</div>
	)
}

export default CountryInfo