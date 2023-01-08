const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
var db = mongoose.createConnection(process.env.MONGO_URI)
const schema = mongoose.Schema(
  {
    clientId: {
      type: ObjectId,
      required: true,
    },
    repId: {
      type: ObjectId,
      required: true,
    },
    business_Type: {
      type: String,
      required: [true, 'Please add the business type'],
    },
    company_name: {
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
const CompanyInformation = db.model('companyInformation', schema)
module.exports = CompanyInformation