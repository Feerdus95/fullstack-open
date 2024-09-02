require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password || password.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

mongoose.set("strictQuery", false);
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)
const person = new Person({
    name,
    number
})

async function addPerson(name, number) {
    try { const result = await person.save() }
    catch (error) { console.log("Error adding a person / Error al añadir una persona", error) }
    finally { mongoose.connection.close() }
    console.log(`Person ${person.name} ${person.number} added to phonebook. / Persona ${person.name} ${person.number} agregada a la agenda.`)
}

if (name && number) { 
    addPerson(name, number)
    .then(result => console.log(`Person ${person.name} ${person.number} added to phonebook. / Persona ${person.name} ${person.number} agregada a la agenda.`))
    .catch(error => console.log("Error adding a person / Error al añadir una persona", error))
} else {
    Person.find({}).then(result => {
        try {
            console.log("Phonebook / Agenda:")
            result.length > 0 
                ? result.forEach(person => console.log(`${person.name} ${person.number}`))
                : console.log("No persons in phonebook / Agenda vacía")
        } 
        catch (error) { console.log("An error occurred / Ocurrió un error", error) }
        finally { mongoose.connection.close() }
    })   
}

