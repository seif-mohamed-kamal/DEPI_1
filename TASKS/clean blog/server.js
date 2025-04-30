// Load Environment Variables 
require('dotenv').config()

// Grap Our Dependencies
const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const port = process.env.PORT;

// Static Middleware
app.use(express.static(__dirname + "/public"))


// Set View Engine
app.set('view engine' , 'ejs')
app.use(expressEjsLayouts)


// Define Routes
app.use(require('./routes/web'))
// Running Application Server
app.listen(port , () => {
    console.log(`Server Running on localhost:${port}`)
})