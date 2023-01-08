const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Client = require('../models/clientModel')
const PDF = require('../models/pdfModel')
const Policy = require('../models/policyModel')
const CompanyInformation = require('../models/companyInformaionModel.js')

const addCompanyInformation = asyncHandler(async (req, res) => {

  const { repId, clientId, business_Type, company_name, sic_code, annual_revenue,  } = req.body
  if (!business_Type || !company_name || !sic_code || !annual_revenue ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const companyInformation  = new CompanyInformation({
    repId: repId,
    clientId: clientId,
    business_Type: business_Type,
    company_name: company_name,
    sic_code: sic_code,
    annual_revenue: annual_revenue,
  })
  companyInformation.save((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Company Information saved successfully');
    }
  });
  
})

const getPolicies = asyncHandler(async (req, res) => { 
  const policies = await Policy.find({ "repId": req.body._id })
   res.status(200).json(policies)
});

const addPolicy = asyncHandler(async (req, res) => {

  const { repId, clientId, primaryActivity, quoteDate, validUntil, policyPeriod, revenue, employees, capacity, policyCost } = req.body
  if (!primaryActivity || !quoteDate || !validUntil || !policyPeriod || !revenue || !employees || !capacity || !policyCost) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const policy = new Policy({
    repId: repId,
    clientId: clientId,
    primaryActivity: primaryActivity,
    quoteDate: quoteDate,
    validUntil: validUntil,
    policyPeriod: policyPeriod,
    revenue: revenue,
    employees: employees,
    capacity: capacity,
    policyCost: policyCost,
  })
  policy.save((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Policy saved successfully');
    }
  });
  
})


const addPdf = asyncHandler(async (req, res) => {
  const { buffer } = req.file

  const pdf = new PDF({
    repId: req.body.repId,
    clientId: req.body.clientId,
    fileName: req.body.filename,
    data: buffer,
    clientName: req.body.name
  })

  pdf.save((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('PDF saved successfully');
    }
  });
});

const getPdfs = asyncHandler(async (req, res) => {
  const pdfs = await PDF.find({ "repId": req.body[0], "clientId": req.body[1]})
  res.status(200).json(pdfs)
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userType } = req.body
  if (!name || !email || !password || !userType) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userType,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const registerClient = asyncHandler(async (req, res) => {
  const { name, email, password, userType, brokerId } = req.body
  if (!name || !email || !password || !userType || !brokerId) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExists = await Client.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  {
    const user = await Client.create({
      name,
      email,
      password: hashedPassword,
      userType,
      brokerId,
    })
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        brokerId: user._id,
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
  const { email, password, userType } = req.body
  if (userType === "Client") {
    const user = await Client.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  }
  else {
    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
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

  const rep = await Client.find({"brokerId": req.body._id}, { name: 1, email: 1, userType: 1, primaryBroker: 1, _id: 1 })
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
