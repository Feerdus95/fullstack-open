require('dotenv').config()
const port = process.env.PORT
const Person = require('./models/persons')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => { res.json(persons) })
})

app.get('/info', (req, res, next) => {
  Person.find().then(persons => {
    res.send(`<p>Phonebook has info for ${ persons.length } people</p><p>${ new Date() }</p>`)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => { person ? res.json(person) : res.status(404).end() })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ error: 'Name or number missing / Nombre o número faltante' })
  }
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      console.log(`Person ${savedPerson.name} ${savedPerson.number} added to phonebook. / Persona ${savedPerson.name} ${savedPerson.number} agregada a la agenda.`)
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => { res.json(updatedPerson) })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const result = await Person.findByIdAndDelete(req.params.id)
    result
      ? (console.log(`Person ${result.name} ${result.number} deleted from phonebook. / Persona ${result.name} ${result.number} eliminada de la agenda.`), res.status(204).end())
      : res.status(404).json({ error: 'Person not found / Persona no encontrada' })
  } catch (error) { next(error) }
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID / ID malformado' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.listen(port, () => { console.log(`Server running on port / Servidor ejecutandose en puerto: ${ port }`) })