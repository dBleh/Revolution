const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
var db = mongoose.createConnection(process.env.MONGO_URI)
const ObjectId = require("mongodb").ObjectId;
const cModel = require('../models/cModel')
const rModel = require('../models/rModel')

const addContactInfo = asyncHandler(async (req, res) => {
  const { clientId, legalEntityName, email, phoneNumber } = req.body;
  await db.collection("clients").updateOne(
    { _id: ObjectId(clientId) },
    { $set: { 'data.legalEntityName': legalEntityName, 'data.phoneNumber': phoneNumber } }
  );
});

const getClientContactInfo = asyncHandler(async (req, res) => {
  const contactInfo = await db.collection("clients").findOne({ _id: ObjectId(req.body._id) })
  const list = [contactInfo['data']['legalEntityName'],contactInfo['data']['phoneNumber']]
  console.log(list)
  res.status(200).json(list)
});

const deleteCalendarEvent = asyncHandler(async (req, res) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId) {
    res.status(400)
    throw new Error('Please provide representative ID and event ID')
  }
  await db.collection("representatives").updateOne(
    { _id: ObjectId(userId) },
    { $unset: { [`events.${eventId}`]: "" } }
  );

  res.json({ message: "Event deleted successfully" });
});

const getCalendarEvents = asyncHandler(async (req, res) => {

  const events = await db.collection("representatives").findOne(
    { _id: ObjectId(req.body._id) },

  );
  var list = []
  var counter = 0
  const keys = Object.keys(events.events);
  for (const key in events.events) {
    var tempDict = events.events[key]
    tempDict['eventId'] = keys[counter]
    list[counter] = tempDict
    counter += 1
  }
  res.status(200).json(list)
});

const addCalendarEvent = asyncHandler(async (req, res) => {
  const { repId, day, info, startTime, endTime } = req.body
  const event = {
    info: info,
    day: day,
    startTime: startTime,
    endTime: endTime
  }
  const eventId = uuidv4();
  if (!repId || !info) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  await db.collection("representatives").updateOne(
    { _id: ObjectId(repId) },
    { $set: { [`events.${eventId}`]: event } }
  );
})

const addCompanyInformation = asyncHandler(async (req, res) => {
  const { clientId, business_Type, company_name, sic_code, annual_revenue, } = req.body
  if (!business_Type || !company_name || !sic_code || !annual_revenue) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  await db.collection("clients").updateOne(
    { _id: ObjectId(clientId) },
    {
      $set: {
        'data.businessType': business_Type,
        'data.companyName': company_name,
        'data.sicCode': sic_code,
        'data.annualRevenue': annual_revenue,
      }
    }
  );
})

const getPolicies = asyncHandler(async (req, res) => {
  const policies = await db.collection('clients').findOne(
    {_id: ObjectId(req.body.clientId)},)
    
    var list = []
    var counter = 0
    if(policies['policyId']){
      console.log(policies['policyId'])
      const keys = Object.keys(policies.policies);
      for (const key in policies.policies) {
        var tempDict = policies.policies[key]
        tempDict['policyId'] = keys[counter]
        list[counter] = tempDict
        counter += 1
      }
      res.status(200).json(list)
    }
   else{
    res.status(200).json(list)
   }
    
    res.status(200).json(list)
});

const addPolicy = asyncHandler(async (req, res) => {

  const { clientId, primaryActivity, quoteDate, validUntil, policyPeriod, revenue, employees, capacity, policyCost } = req.body
  if (!primaryActivity || !quoteDate || !validUntil || !policyPeriod || !revenue || !employees || !capacity || !policyCost) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const policyId = uuidv4();
  const policy = {
    primaryActivity: primaryActivity,
    quoteDate: quoteDate,
    validUntil: validUntil,
    policyPeriod: policyPeriod,
    revenue: revenue,
    employees: employees,
    capacity: capacity,
    policyCost: policyCost,
  }
  await db.collection("clients").updateOne(
    { _id: ObjectId(clientId) },
    {
      $set: {
        [`policies.${policyId}`] : policy
      }
    }
  );
})


const addPdf = asyncHandler(async (req, res) => {
  const { buffer } = req.file
  const pdfId = uuidv4();
  const pdf = {
    fileName: req.body.filename,
    data: buffer,
  }

  await db.collection("clients").updateOne(
    { _id: ObjectId(req.body.clientId) },
    {
      $set: { [`pdfs.${pdfId}`]: pdf }
    }
  )
}
)

const getPdfs = asyncHandler(async (req, res) => {
  const pdfs = await db.collection("representatives").findOne(
    { _id: ObjectId(req.body._id) },

  );
  var list = []
  var counter = 0
  const keys = Object.keys(pdfs.pdfs);
  for (const key in pdfs.pdfs) {
    var tempDict = pdfs.pdfs[key]
    tempDict['pdfId'] = keys[counter]
    list[counter] = tempDict
    counter += 1
  }
  res.status(200).json(list)
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body
  e = email.toLowerCase()
  if (!name || !email || !password || !role) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExists = await rModel.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await rModel.create({
    name,
    email: e,
    password: hashedPassword,
    role: role,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const registerClient = asyncHandler(async (req, res) => {
  const { email, password, brokerId, role } = req.body
  e = email.toLowerCase()
  if (!email || !password || !brokerId) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExists = await cModel.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  {
    const user = await cModel.create({
      email: e,
      password: hashedPassword,
      rId: brokerId,
      role: role,
    })
    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        rId: brokerId,
        role: user.role,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body
  e = email.toLowerCase()

  if (role === "Client") {
    const user = await cModel.findOne({ e })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  }
  else {
    // Check for user email
    const user = await rModel.findOne({ e })
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  }

})

// get all clients
const getClients = asyncHandler(async (req, res) => {

  const rep = await cModel.find({ "rId": req.body._id }, { email: 1, role: 1, _id: 1 })
  res.status(200).json(rep)

})
const changeClient = asyncHandler(async (req, res) => {
  res.status(200).json(req.body)
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  addContactInfo,
  getClientContactInfo,
  deleteCalendarEvent,
  getCalendarEvents,
  addCalendarEvent,
  addCompanyInformation,
  getPolicies,
  addPolicy,
  getPdfs,
  addPdf,
  registerUser,
  registerClient,
  changeClient,
  loginUser,
  getClients,
  getMe,
}
