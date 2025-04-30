// Require Employee Model
const Employee = require('../models/employeee'); // make sure the file name is employee.js

// Get All Employees
async function index(req, res) {
    try {
        const employees = await Employee.find({});
        res.render('pages/index.ejs', { employees });
    } catch (err) {
        res.status(500).send("Error fetching employees: " + err.message);
    }
}

// Render Create.ejs
function create(req, res) {
    res.render('pages/create.ejs');
}

// Save Employee
function store(req, res) {
    const employee = new Employee({
        name: req.body.name,
        address: req.body.address,
        salarey: req.body.salarey,
        gender: req.body.gender
    });

    employee.save()
        .then(() => res.redirect("/"))
        .catch(err => {
            console.error("Error saving employee:", err.message);
            res.status(500).send("Failed to save employee");
        });
}

// Show Single Employee
async function show(req, res) {
    try {
        const id = req.params.id.trim();
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).send("Employee not found");
        res.render('pages/show.ejs', { employee });
    } catch (err) {
        res.status(500).send("Error fetching employee: " + err.message);
    }
}

// Render Edit.ejs
async function edit(req, res) {
    try {
        const id = req.params.id.trim();
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).send("Employee not found");
        res.render('pages/edit.ejs', { employee });
    } catch (err) {
        res.status(500).send("Error loading edit form: " + err.message);
    }
}

// Update Employee
async function update(req, res) {
        const id = req.params.id.trim();
        const employee = await Employee.findById(id);
        employee.name = req.body.name;
        employee.address = req.body.address;
        employee.salarey = req.body.salarey;
        employee.gender = req.body.gender;
        await employee.save();
        res.redirect("/");
}

// Delete Employee
function destroy(req, res) {
    const id = req.params.id.trim();
    Employee.findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => {
            res.status(500).send("Error deleting employee: " + err.message);
        });
}

// Export Controller Functions
module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy
};
