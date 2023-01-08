const asyncHandler = require('express-async-handler')
const CompanyInformation = require('../models/companyInformaionModel')
const User = require('../models/userModel')

// @desc    Get companyInformation
// @route   GET /api/companyInformation
// @access  Private
const getCompanyInformation = asyncHandler(async (req, res) => {
  const companiesInformation = await CompanyInformation.find({ user: req.user.id })
  res.status(200).json(companiesInformation)
})

// @desc    Set companyInformation
// @route   POST /api/companyInformation
// @access  Private
const setCompanyInformation = asyncHandler(async (req, res) => {
  if (!req.body.companyName || !req.body.sic_code || !req.body.annual_revenue) {
    res.status(400)   
    throw new Error('Please add a text field')
  }
  const companyInformation = await CompanyInformation.create({
    companyName: req.body.companyName,
    sic_code: req.body.sic_code,
    annual_revenue: req.body.annual_revenue,
    user: req.user.id,
  })
  res.status(200).json(companyInformation)
})

// @desc    Update companyInformation
// @route   PUT /api/companyInformation/:id
// @access  Private
const updateCompanyInformation = asyncHandler(async (req, res) => {
  const companyInformation = await CompanyInformation.findById(req.params.id)
  if (!companyInformation) {
    res.status(400)
    throw new Error('CompanyInformation not found')
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure the logged in user matches the companyInformation user
  if (companyInformation.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const updatedCompanyInformation = await CompanyInformation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedCompanyInformation)
})

// @desc    Delete companyInformation
// @route   DELETE /api/companyInformation/:id
// @access  Private
const deleteCompanyInformation = asyncHandler(async (req, res) => {
  const companyInformation = await CompanyInformation.findById(req.params.id)
  if (!companyInformation) {
    res.status(400)
    throw new Error('CompanyInformation not found')
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure the logged in user matches the companyInformation user
  if (companyInformation.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await companyInformation.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
getCompanyInformation,
setCompanyInformation,
updateCompanyInformation,
deleteCompanyInformation,
}
