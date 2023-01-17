const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
  {
    clientId: {
      type: ObjectId,
      required: true,
      
    },
    legalEntityName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please add an email'],
    },
  },
  {
    timestamps: true,
  }
)
const contactInfoModel = db.model('ContactInfo', schema)
module.exports = contactInfoModel