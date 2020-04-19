import React from 'react';

const Course = (props) => {
	//console.log(props)
	return(
	  <div>
		<Header course={props.course.name} />
		<Content parts={props.course.parts} />
		<Total parts={props.course.parts.map(part => part.exercises)} />
	  </div>
	)
  }
  const Header = (props) => {
	//console.log(props)
	return(
	  <h2>{props.course}</h2>
	)
  }
  
  const Content = (props) => {
	//console.log(props)
	return(
	  <div>
		{props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
	  </div>
	)
  }
  
  const Part = (props) => {
	return(
	  <p>
		{props.part} {props.exercises}
	  </p>
	)
  }
  
  const Total = (props) => {
	//console.log(props)
	const total = props.parts.reduce( (accumulator, currentValue)=> accumulator + currentValue)
	return(
	  <b>
		Total of {total} exercises
	  </b>
	)
  }

  export default Course