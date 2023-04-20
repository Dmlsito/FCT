
const Router = require('express')

const getUsers = require('../controllers/userControllers.js')
const createUser = require('../controllers/userControllers.js')
const updateUser = require('../controllers/userControllers.js')
const deleteUser = require('../controllers/userControllers.js')

const router = Router()

// Get user //
router.get('/login', getUsers)
// Create new user
router.post('/', createUser)
// Update user //
router.put('/', updateUser)
// Delete user //
router.delete('/', deleteUser)

module.exports = router
