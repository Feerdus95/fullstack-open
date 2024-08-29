import { useState } from 'react'
import './App.css'

const Title = () => { return <h1>Anecdote of the day / Anécdota del día</h1> }
const Button = ({ onClick, text }) => { return <button onClick={onClick}>{text}</button> }
const MostVoted = ({ text, votes }) => { return <p>{text} has {votes} votes</p> }

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCounter, setVoteCounter] = useState(Array(anecdotes.length).fill(0))
  const handleVotes = () => {
    const newVotes = [...voteCounter]
    newVotes[selected] += 1
    setVoteCounter(newVotes)
  }

  return (
    <>
      <Title />
      <p>{anecdotes[selected]}</p>
      <p>has {voteCounter[selected]} votes</p>
      <Button onClick={() => handleVotes()} text="Vote / Votar" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * 8))} text="Next anecdote / Siguiente anécdota" />
      <h2>Anecdote with most votes / Anécdota con más votos</h2>
      <MostVoted text={anecdotes[voteCounter.indexOf(Math.max(...voteCounter))]} votes={Math.max(...voteCounter)} />
    </>
  )
}

export default App