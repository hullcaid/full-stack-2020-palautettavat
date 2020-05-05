import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import listingService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString] = useState('')

  useEffect(() => {
    listingService.getAll()
    .then(response => setPersons(response))
  },
  [])
  
  const handleNewNameChange = (event) => {
	  setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
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
    listingService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
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