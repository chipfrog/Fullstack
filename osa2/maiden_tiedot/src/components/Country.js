import React from 'react'

const Country = (props) => {
  const name = props.name
  const buttonFunction = props.handleClick
  
  return (
    <div>
      {name}
      <button onClick={buttonFunction}>show</button>
    </div>
  )
}

export default Country