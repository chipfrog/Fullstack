import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)
const MostVoted = ({points}) => {
  let mostVotes = points[0]
  let indexOfMostVotes = 0
  for (let i = 0; i < points.length; i++) {
    if (points[i] > mostVotes) {
      mostVotes = points[i]
      indexOfMostVotes = i
    }
  }
  return (
      <div>
        {anecdotes[indexOfMostVotes]}
        <div>
          {`has ${points[indexOfMostVotes]} votes`}
        </div>
      </div>
    )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(array)
  
  const addPoint = () => {
    const copy=[...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
        {`has ${points[selected]} votes`}
      </div>
      <p>
        <Button handleClick={() => addPoint()} text={'vote'} />
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text = {'next anecdote'} />
      </p>
      <div>
        <h2>Anecdote with most votes</h2>
          <MostVoted points={points} />
      </div>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const array = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
