import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics =(props) => {
  const {good, neutral, bad} = props
  const all = good+neutral+bad

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
    return (good / all) *100
  }

  return(
    <div>
      <h1>statistics</h1>
      good: {good}<br/>
      neutral: {neutral}<br/>
      bad: {bad}<br/>
      all: {all}<br/>
      average: {average()}<br/>
      positive: {positiveRatio()} %      
    </div>
  )

}

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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
);