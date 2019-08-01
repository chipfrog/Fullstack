import React from 'react'

const Person = (props) => {
  const name = props.name
  const number = props.number
  const buttonFunction = props.deletePerson
  
  return (
      <div>
        {name} {number}
        <button onClick={buttonFunction}>delete</button>
      </div>
    )
}

export default Person