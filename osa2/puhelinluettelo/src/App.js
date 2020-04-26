import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  

  const handleNewNameChange = (event) => {
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
  }

  const Person = (props) => <li>{props.name} {props.number}</li>

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
		      	value={newName}
			      onChange={handleNewNameChange}
		      />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNewNumberChange} 
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
		  {persons.map((person) => <Person key={person.name} name={person.name} number={person.number} /> )
		  }
	  </ul>
    </div>
  )

}

export default App