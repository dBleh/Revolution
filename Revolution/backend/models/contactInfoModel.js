const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    legalEntityName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
const contactInfoModel = db.model('ContactInfo', schema)
module.exports = contactInfoModel