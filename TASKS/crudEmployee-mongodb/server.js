// Load Environment Variables 
require('dotenv').config()

// Grap Our Dependencies
const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const port = process.env.PORT;

// Static Middleware
app.use(express.static(__dirname + "/public"))

// Set View Engine
app.set('view engine' , 'ejs')
app.use(expressEjsLayouts)

// Database Connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
if(db) {console.log("Connection Success")}

// db.on("error" , (err) => console.error(err.message))
// db.once('open' , () =>  console.log('connection success'))

app.use(express.urlencoded({extended : false}))
app.use(express.json())
// Define Routes
app.use(require('./routes/web'))
app.use('/api/v1' , require("./routes/api"))
// Running Application Server
app.listen(port , () => {
    console.log(`Server Running on localhost:${port}`)
})