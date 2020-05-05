import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },
  [])
  console.log('redered', persons.length)
  
  const handleNewNameChange = (event) => {
	  //console.log(event.target.value)
	  setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setFilterString(filterValue)
  }

  const handleSubmit = (event) =>{
	  event.preventDefault()
	  if (persons.filter(person => person.name === newName).length > 0) {
		window.alert(`${newName} is already added to phonebook`)
	  }
	  else {
		const personObject = {
      name: newName,
      number: newNumber
    }
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setFilterString('')
      })
	  }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterString} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm 
        nameInput={newName} 
        numberInput={newNumber} 
        handleNameChange={handleNewNameChange}
        handleNumberChange={handleNewNumberChange}
        handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
		  <Persons persons={persons} filterValue={filterString} />
    </div>
  )

}

export default App