const express = require('express')
const router = express.Router()
const employeeApiController = require('../app/controllers/api/employee.api.controller')

router.get('/posts' , employeeApiController.index)
router.get('/posts/:id' , employeeApiController.show)
module.exports = router;