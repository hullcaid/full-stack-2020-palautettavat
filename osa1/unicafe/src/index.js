import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics =(props) => {
  const {good, neutral, bad} = props
  const all = good+neutral+bad

  if (all === 0) {
    return(
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  const average = () => {
    if(all === 0) {
      return 0
    }
    return (good - bad) / all
  }
  
  const positiveRatio = () => {
    if (all === 0){
      return 0
    }
    const ratio = ((good / all) *100)
    return (ratio + ' %')
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good:' value={good} />
          <StatisticLine text='neutral:' value={neutral} />
          <StatisticLine text='bad:' value={bad} />
          <StatisticLine text='all:' value={all} />
          <StatisticLine text='average:' value={average()} />
          <StatisticLine text='positive:' value={positiveRatio()} />
        </tbody>
      </table>
    </div>
  )

}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td> {props.value}</td>
  </tr>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'} />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
);