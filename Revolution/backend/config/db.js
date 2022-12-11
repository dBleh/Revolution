const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = mongoose.createConnection(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
