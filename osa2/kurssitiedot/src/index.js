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
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
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
const Total = (props) => {
  const result = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <div>
      <p>
        Number of exercises {result}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
