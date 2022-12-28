
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = new mongoose.Schema({
  clientId: {
    type: ObjectId,  
  },
  repId: {
    type: ObjectId,  
  },
  fileName: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  }, {
    timestamps: true
  })
const PDF = db.model('PDF', schema)
module.exports = PDF
