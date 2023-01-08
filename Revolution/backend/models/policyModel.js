
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = new mongoose.Schema({
    clientId: {
        type: ObjectId,
        required: true,
    },
    repId: {
        type: ObjectId,
        required: true,
    },
    primaryActivity: {
        type: String,
        required: true,
    },
    quoteDate: {
        type: Date,
        required: true,
    },
    validUntil: {
        type: Date,
        required: true,
    },
    policyPeriod: {
        type: Number,
        required: true,
    },
    revenue: {
        type: Number,
        required: true,
    },
    employees: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    policyCost: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true
})
const policySchema = db.model('policies', schema)
module.exports = policySchema
