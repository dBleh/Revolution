const express = require('express')
const router = express.Router()
const {
  registerUser,
  registerClient,
  loginUser,
  getClients,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/registerClient',registerClient)
router.post('/login', loginUser)
router.get('/getClients', getClients)
router.get('/me', protect, getMe)

module.exports = router
