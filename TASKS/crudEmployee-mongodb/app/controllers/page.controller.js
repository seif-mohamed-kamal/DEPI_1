function index(req , res) {
    res.send("<h2>Home Page</h2>")
}

function contact(req , res) {
    res.render('pages/contact.ejs')
}

module.exports = {
    contact
}