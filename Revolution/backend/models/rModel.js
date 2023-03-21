const mongoose = require('mongoose')
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
        role: {
            type: String,
            required: [true, 'Please add a user type (ex: Client, Broker, Admin...)'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        events: {
            type: mongoose.Schema.Types.Mixed
        }
    },
    {
        timestamps: true,
    }
)
const rModel = db.model('Representative', schema)
module.exports = rModel
