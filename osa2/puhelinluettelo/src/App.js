import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import listingService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    listingService.getAll()
    .then(response => setPersons(response))
  },
  [])
  
  const handleSubmit = (event) =>{
	  event.preventDefault()
	  if (persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}

        listingService.modify(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : response))
            setNewName('')
            setNewNumber('')
            setNotificationType('notification')
            setNotificationMessage(`Changed ${response.name}`)
            setTimeout(()=>{
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationType('error')
            setNotificationMessage(`${changedPerson.name} was not found from the server`)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 5000)
          })
      }
	  } else {
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
        setNotificationType('notification')
        setNotificationMessage(`Added ${response.name}`)
        setTimeout(()=> {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000)
      })
	  }
  }  
  
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

  const handleRemoveButton = (id) => {
    // console.log('pressed ', id)
    // console.log(persons)
    const personToDelete = persons.find(person => person.id === id)
    // console.log(personToDelete)
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      // console.log(`Deleting ${personToDelete.name}`)
      listingService.remove(id)
        .then(()=>{
          setPersons(persons.filter(person => person.id !== id))
          setNotificationType('notification')
          setNotificationMessage(`Removed ${personToDelete.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter filterValue={filterString} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm 
        nameInput={newName} 
        numberInput={newNumber} 
        handleNameChange={handleNewNameChange}
        handleNumberChange={handleNewNumberChange}
        handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
		  <Persons persons={persons} filterValue={filterString} handleDelete={handleRemoveButton}/>
    </div>
  )

}

export default App