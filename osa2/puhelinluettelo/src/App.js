import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleInputChange = (event) =>{
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }

  const handleSubmit = (event) =>{
	  event.preventDefault()
	  if (persons.filter(person => person.name === newName).length > 0) {
		window.alert(`${newName} is already added to phonebook`)
	  }
	  else {
		const personObject = {
			name: newName
		}
		setPersons(persons.concat(personObject))
	  }
	  setNewName('')
  }

  const Person = (props) => <li>{props.name}</li>

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
		  	value={newName}
			onChange={handleInputChange}
		  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
		  {persons.map((person) => <Person key={person.name} name={person.name} /> )
		  }
	  </ul>
    </div>
  )

}

export default App