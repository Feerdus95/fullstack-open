import { useState } from 'react'
import './App.css'

const Title = () => <h1>Give Feedback / Dar retroalimentación</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return <p>No feedback has been given / No se ha dado retroalimentación</p>
  }

  const average = (good - bad) / all
  const positive = (good / all) * 100
  
  return (
    <div>
      <h2>Statistics / Estadísticas</h2>
      <table>
        <StatisticLine text="Good / Bueno" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad / Malo" value={bad} />
        <StatisticLine text="All / Total" value={all} />
        <StatisticLine text="Average / Promedio" value={average.toFixed(2)} />
        <StatisticLine text="Positive / Positivo" value={positive.toFixed(2)} />
      </table>
    </div>
  )
}
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title />
      <Button onClick={() => setGood(good + 1)} text="Good / Bueno" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad / Malo" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App