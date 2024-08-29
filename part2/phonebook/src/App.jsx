import './App.css'
import { useState } from 'react'

const Title = () => <h1>Phonebook / Telefónica</h1>
const Person = ({ person }) => { return <p>{ person.name } { person.number }</p> }
const Filter = ({ filter, handleFilter }) => {
  return <div>Filtered with / Filtrado por <input value={ filter } onChange={ handleFilter } /></div>
}
const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={ addName }>
      <div>
        Name / Nombre: <input value={ newName } onChange={ handleNameChange } />
      </div>
      <div>
        Number / Número: <input value={ newNumber } onChange={ handleNumberChange } />
      </div>
      <div>
        <button type="submit">Add / Añadir</button>
      </div>
    </form>
  )
}
const Persons = ({ persons, filter }) => {
  return (
    <div>
      { persons
        .filter( person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map( person => <Person key={ person.id } person={ person } />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const checkDuplicateName = persons.some(person => person.name === newName)
  if (checkDuplicateName) {
    alert(`${newName} already on the list / ya en la lista`)
    setNewName('')
  }
  const personsList = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()) || 
    person.number.includes(filter)
  )

  return (
    <div>
      <Title />
      <Filter filter={ filter } handleFilter={ handleFilterChange } />
      <PersonForm addName={ addName } newName={ newName } handleNameChange={ handleNameChange } newNumber={ newNumber } handleNumberChange={ handleNumberChange } />
      <Persons persons={ personsList } filter={ filter } />
    </div>
  )
}

export default App
