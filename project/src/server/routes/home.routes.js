const Router = require('express')
const getMachineState = require('../controllers/machineStateController.js')

const router = Router()

router.get('/main-page', getMachineState)

module.exports = router
