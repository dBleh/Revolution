const express = require('express')
const router = express.Router()
const {
  getCompanyInformation,
  setCompanyInformation,
  updateCompanyInformation,
  deleteCompanyInformation,
} = require('../controllers/companyInfoController')

const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect, getCompanyInformation).post(protect, setCompanyInformation)
router.route('/:id').delete(protect, deleteCompanyInformation).put(protect, updateCompanyInformation)

module.exports = router
