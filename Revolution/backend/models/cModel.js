const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
    {
        rId: {
            type: ObjectId,
            required: true,
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
        role:{
            type: String,
            required: [true, 'Please add a role'],
        },
        data:{
            type: mongoose.Schema.Types.Mixed

        }
        
    },
    {
        timestamps: true,
    }
)
const cModel = db.model('Client', schema)
module.exports = cModel
