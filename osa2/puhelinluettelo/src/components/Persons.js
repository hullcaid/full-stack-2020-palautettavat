import React from 'react'
import Person from './Person'

const Persons = ({persons, filterValue, handleDelete}) => { 
  // console.log(handleDelete)
  if(filterValue.length === 0){
      return(
      <ul>
        {persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>)}
      </ul>)
    }
    return(
      <ul>
      {persons
      .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
      .map(filteredPerson => 
        <Person key={filteredPerson.id} id={filteredPerson.id} name={filteredPerson.name} number={filteredPerson.number} handleDelete={handleDelete}/>)}
      </ul>
      )
  }

export default Persons