const express = require('express')
const router = express.Router()
const PageController = require('../app/controllers/page.controller')
const employeeController = require('../app/controllers/employee.controller')

router.get('/' , employeeController.index)

router.get('/create' , employeeController.create)
router.post('/store' , employeeController.store)

router.get("/employee/:id" , employeeController.show);

router.get('/employee/edit/:id' , employeeController.edit);
router.post('/employee/update/:id' , employeeController.update);

router.get('/employee/delete/:id' , employeeController.destroy)

router.get('/contact' , PageController.contact)

module.exports = router;