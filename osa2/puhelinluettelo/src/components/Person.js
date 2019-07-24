import React from 'react'

const Person = (props) => {
  const name = props.name
  const number = props.number
    return (
      <div>
        {name} {number}
      </div>
    )
}

export default Person