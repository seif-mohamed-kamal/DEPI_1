const employee = require('../../models/employeee');

async function index(req , res) {
    try {
        const employees = await employee.find()
        res.json(employees);
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
}

async function show(req , res) {
    const id = req.params.id
    try {
        const employee = await employee.findById(id)
        res.json(employee);
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }

}


module.exports = {
    index , 
    show
}