import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div> 
  )
}
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.count}
      </p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map(row => <Part key={row.id} part={row.name} count={row.exercises}/>)}
    </div>
  )
}
const Total = (props) => {
  const { parts } = props
  const allExercises = parts.map(num => num.exercises)
  const result = allExercises.reduce((accumulator, currentValue) => 
  accumulator + currentValue)

  return (
    <div>
      <p>
        <b>Number of exercises {result} </b>
      </p>
    </div>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
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
