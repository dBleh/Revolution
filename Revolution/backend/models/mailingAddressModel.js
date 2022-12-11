const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        address_1: {
            type: String,
            required: [true, 'Please add an address'],
        },
        addess_2: {
            type: String,
        },
        addess_3: {
            type: String,
        },
        city: {
            required: [true, 'Please select a city'],
            type: String,
        },
        state_province_region: {
            required: [true, 'Please select a state/province/region'],
            type: String,
        },
        postal_code: {
            required: [true, 'Please add a postal code'],
            type: String,
        },
        country: {
            required: [true, 'Please select a country'],
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
const mailingAddress = db.model('MailingAddress', schema)
module.exports = mailingAddress