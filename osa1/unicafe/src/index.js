import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h1>
      {props.header}
    </h1>
  </div>
)
const Button = (props) => (
    <button onClick = {props.handleClick}>{props.text}</button>
)
const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
const Statistics = (props) => {
  const {good, neutral, bad} = props
  const totalClicks = good + neutral + bad
  const average = (good - bad) / totalClicks
  const positive = (good / totalClicks) * 100 + ' %'
  
  if (totalClicks === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={totalClicks} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header = 'Give feedback'/>
      <Button handleClick = {() => setGood(good + 1)} text = 'good' />
      <Button handleClick = {() => setNeutral(neutral + 1)} text = 'neutral' />
      <Button handleClick = {() => setBad(bad + 1)} text = 'bad' />
      <Header header = 'Statistics' />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
    
  )
  
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
