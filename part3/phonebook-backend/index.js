const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', (req) => JSON.stringify(req.body))

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    let person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`
    <p>Phonebook has info for / Agenda tiene información de ${persons.length} people / personas</p>
    <br/>
    <p>${new Date()}</p>
    `)
})

app.post('/api/persons', (req, res) => {
    let data = req.body
    if (!data.name || !data.number) {
        return res.status(400).json({
            error: 'Content missing /Contenido incompleto'
        })
    }
    if (persons.find(person => person.name === data.name)) {
        return res.status(400).json({
            error: 'Name must be unique /Nombre debe ser único'
        })
    }
    let person = {
        id: genID().toString(),
        name: data.name,
        number: data.number
    }

    persons = persons.concat(person)

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

let genID = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return (maxId + 1).toString()
}

app.listen(port, () => {
    console.log(`Server running on port / Servidor ejecutandose en puerto: ${port}`)
})