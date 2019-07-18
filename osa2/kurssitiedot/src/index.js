import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h2>
        {props.course}
      </h2>
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
  const allExercises = props.parts.map(num => num.exercises)
  const result = allExercises.reduce((accumulator, currentValue) => 
  accumulator + currentValue)
  
  return (
    <div>
      <p>
        <b>Number of exercises {result}</b>
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
const Courses = ({ courses }) => {
  const allCourses = courses.map(course => <Course key={course.name} course={course}/>)
  return allCourses
}

const App = () => {
  const courses = [
    {
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
        <h1>Web development curriculum</h1>
        <Courses courses={courses} />
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
