import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => (
  <h1>{props.text}</h1>
)

const Anecdote = (props) => {
  const {text, votes} = props
  return (
    <div>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

const CalculateIndexOfHighesValue = (arr) => {
  // console.log(arr)
  // console.log('Caunting highest index...')
  var max = arr[0]
  var maxIndex = 0

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i
      max = arr[i]
    }
  }
  return maxIndex

}

const GetRandom = (maxValue) =>(
  Math.floor(Math.random() * maxValue)
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  // console.log(votes)
  
  const mostVoted = CalculateIndexOfHighesValue(votes)
 
  const handleVote = () => {
    const newVotes = [...votes]
    // console.log(newVotes)
    newVotes[selected] ++
     // console.log(newVotes)
    setVotes(newVotes)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text = 'vote' />
      <Button handleClick={() => setSelected(GetRandom(props.anecdotes.length))} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdote text={props.anecdotes[mostVoted]} votes={votes[mostVoted]} />
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)