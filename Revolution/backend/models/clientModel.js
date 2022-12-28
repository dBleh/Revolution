const mongoose = require('mongoose')

const { ObjectId } = require('mongodb')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        brokerId: {
            type: ObjectId,
            required: true,
        },
        userType: {
            type: String,
            required: [true, 'Please add a user type (ex: Client, Broker, Admin...)'],
        },
    },
    {
        timestamps: true,
    }
)
const clientModel = db.model('Client', schema)
module.exports = clientModel