const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        year_built: {
            type: Number,
            required: [true, 'Please add the year built'],
        },
        sqft: {
            type: Number,
            required: [true, 'Please add the square footage'],
        },
        stories: {
            type: Number,
            required: [true, 'Please add the number of stories'],
        },
        alarmed: {
            type: Boolean,
            required: [true, 'Does the location have a working alarm system'],

        },
        sprinklered: {
            type: Boolean,
            required: [true, 'Does the location have a working sprinkler system'],
        },
        construction_type: {
            type: String,
            required: [true, 'What is the location made of'],

        },
        year_updated: {
            type: String,
            required: [true, 'Year updates/improvements completed to plumbing, electrical, heating, roof'],

        },
    },
    {
        timestamps: true,
    }
)
const copeInformation = db.model('CopeInformation', schema)
module.exports = copeInformation