
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = new mongoose.Schema({
  repId: {
    type: ObjectId,  
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
  
  },
  endTime: {
    type: String,
    
  },
  }, {
    timestamps: true
  })
const calendar = db.model('calendar', schema)
module.exports = calendar
