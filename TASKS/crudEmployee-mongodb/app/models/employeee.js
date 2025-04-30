// models/employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  salarey: { type: String, required: true },
  gender: { type: String, required: true }
});

module.exports = mongoose.model("employeee", employeeSchema);
