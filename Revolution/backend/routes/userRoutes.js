const express = require('express')
const router = express.Router()

const multer = require('multer');
const upload = multer();

const {
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
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


router.post('/addContactInfo', addContactInfo)
router.post('/', registerUser)
router.post('/registerClient',registerClient)
router.post('/addPdf',upload.single('pdf'),addPdf)
router.post('/addCompanyInformation', addCompanyInformation)
router.post('/addPolicy', addPolicy)
router.post('/login', loginUser)
router.post('/changeClient', changeClient)
router.post('/getPdfs', getPdfs)
router.post('/getPolicies', getPolicies)
router.post('/getClients', getClients)
router.post('/addCalendarEvent', addCalendarEvent)
router.post('/getCalendarEvents', getCalendarEvents)
router.post('/getClientContactInfo', getClientContactInfo)
router.delete('/deleteCalendarEvent', deleteCalendarEvent)

router.get('/me', protect, getMe)

module.exports = router
