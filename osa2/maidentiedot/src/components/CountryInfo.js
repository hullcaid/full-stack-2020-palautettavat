import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'

const CountryInfo = ({country}) => {
	
	const [weather, setWeather] = useState([])
	

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY
		console.log(api_key)
		axios
		.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
		.then(response => {setWeather(response.data)})
	}, [country.capital])
	console.log(weather)

	console.log(country.name)
	return(
		<div>
			<h1>{country.name}</h1>
			<div>
				<div>capital {country.capital}</div>
				<div>population {country.population}</div>
			</div>
			<h2>languages</h2>
			<div>
				<ul>
					{country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
				</ul>
				<img src={country.flag} alt='flag' height="100"/>
			</div>
			<h2>Weather in {country.capital}</h2>
			<Weather weatherData={weather}/>

		</div>
	)
}

export default CountryInfo