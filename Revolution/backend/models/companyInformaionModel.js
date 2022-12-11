const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    companyName: {
      type: String,
      required: [true, 'Please add the company name'],
    },
    sic_code: {
      type: Number,
      required: [true, 'Please add a SIC code'],
    },
    annual_revenue: {
      type: Number,
      required: [true, 'Please add annual revenue'],
    },
  },
  {
    timestamps: true,
  }
)
const companyInformation = db.model('CompanyInformation', schema)
module.exports = companyInformation