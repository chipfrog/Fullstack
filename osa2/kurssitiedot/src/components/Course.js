import React from 'react'

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

export default Course