import React from 'react'

const Country = (props) => {
  const name = props.name
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Toimii')
  } 

  return (
    <div>
      {name}
      <button onClick={handleClick}>show</button>
    </div>
  )
}

export default Country