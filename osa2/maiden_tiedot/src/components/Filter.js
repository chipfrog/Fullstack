import React from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input
      value={props.newFilter}
      onChange={props.handler} />
    </div>
  )
}
export default Filter