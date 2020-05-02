import React, {useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import Result from './components/Result'

const App = () =>{
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('retreive data effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, 
  [])

  const handleButtonClick = (props) => {
    console.log(props)
    setFilter(props.name)
  }

  const handleSearchInput = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return(
    <div>
      <Search input={filter} handleInputChange={handleSearchInput}/>
      <Result countries={countries} filterValue={filter} handleButtonClick={handleButtonClick}/>

    </div>
  )
}

export default App;
