import React from 'react'
import Person from './Person'

const Persons = ({persons, filterValue}) => {
    if(filterValue.length === 0){
      return(
      <ul>
        {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
      </ul>)
    }
    return(
      <ul>
      {persons
      .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
      .map(filteredPerson => 
        <Person key={filteredPerson.name} name={filteredPerson.name} number={filteredPerson.number}/>)}
      </ul>
      )
  }

export default Persons