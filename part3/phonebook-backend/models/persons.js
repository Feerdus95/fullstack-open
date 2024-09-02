require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false);
mongoose.connect(url).then((result) => {console.log('connected to MongoDB')}).catch((error) => {console.log('error connecting to MongoDB:', error.message)})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        match: [/^[\d-]+$/, 'The number should contain only digits / El número debe contener solo números'],
        validate: {
            validator: function(v) { return /^(\d{2}-\d{8}|\d{3}-\d{8})$/.test(v) },
            message: props => `${ props.value } is not a valid phone number / ${ props.value } no es un número de telefono valido`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)