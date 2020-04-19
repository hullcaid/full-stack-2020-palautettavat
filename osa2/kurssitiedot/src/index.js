import React from 'react';
import ReactDOM from 'react-dom';

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
    <h1>{props.course}</h1>
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
  console.log(props)
  const total = props.parts.reduce( (accumulator, currentValue)=> accumulator + currentValue)
  return(
    <p>
      Number of Exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of a union',
        exercises: 12,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
;
