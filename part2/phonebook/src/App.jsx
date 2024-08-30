import './App.css'
import { useState, useEffect } from 'react'
import personService from './services/personService'
import { v4 as uuidv4 } from 'uuid'

const Title = () => <h1>Phonebook / Telefónica</h1>
const Notification = ({ message }) => (  message === null ? null : <div className='notification'>{ message }</div> );
const Person = ({ person, handleDelete }) => { return <p>{ person.name } { person.number } <button onClick={ () => handleDelete(person.id) }>Delete / Eliminar</button></p> }
const Filter = ({ filter, handleFilter }) => { return <div>Filtered with / Filtrado por <input value={ filter } onChange={ handleFilter } /></div> }
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
const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      { persons
        .filter( person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map( person => <Person key={ person.id } person={ person } handleDelete={ handleDelete } />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber, id: uuidv4() }
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setMessage(`${newName}'s number has been updated. / número ha sido actualizado.`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch(error => {
            console.log(error.response.data);
            alert(error.response.data.error);
          });
      }
      return;
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} has been added to phonebook. / ha sido agregado a la agenda.`)
        setTimeout(() => { setMessage(null) }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data.error)
      })
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

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`${person.name} has been deleted from phonebook. / ha sido eliminado de la agenda.`)
          setTimeout(() => { setMessage(null) }, 5000)
        })
        .catch(error => {
          console.log(error.response.data);
          alert(error.response.data.error);
        });
    }
  };

  const personsList = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()) || 
    person.number.includes(filter)
  )

  return (
    <div>
      <Title />
      <Notification message={ message } />
      <Filter filter={ filter } handleFilter={ handleFilterChange } />
      <PersonForm addName={ addName } newName={ newName } handleNameChange={ handleNameChange } newNumber={ newNumber } handleNumberChange={ handleNumberChange } />
      <Persons persons={ personsList } filter={ filter } handleDelete={ handleDelete } />
    </div>
  )
}

export default App