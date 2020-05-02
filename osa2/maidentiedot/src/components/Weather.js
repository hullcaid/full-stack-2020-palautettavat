import React from 'react'

const Weather = ({weatherData}) => {
	if (weatherData.length === 0) {
		return <div></div>
	}
	return(
		<div>
			<div>
				<b>Temperature:</b> {weatherData.current.temperature} Celcius
			</div>
			<img 
				src={weatherData.current.weather_icons} 
				alt={weatherData.current.weather_descriptions} 
				height="48"/>
			<div>
				<b>wind:</b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}

			</div>

		</div>
	)
}

export default Weather