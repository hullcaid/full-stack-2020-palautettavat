import React from 'react';
import ReactDOM from 'react-dom';

const AppHeader = (props) => {
  return(
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

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
  console.log(props)
  const total = props.parts.reduce( (accumulator, currentValue)=> accumulator + currentValue)
  return(
    <b>
      Total of {total} exercises
    </b>
  )
}

const App = () => {
  const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <AppHeader header={'Web development curriculum'} />
      {courses.map(course => <Course key={course.id} course={course} /> )}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
;
