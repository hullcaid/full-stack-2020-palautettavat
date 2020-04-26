import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString] = useState('')

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
		setPersons(persons.concat(personObject))
	  }
    setNewName('')
    setNewNumber('')
    setFilterString('')
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