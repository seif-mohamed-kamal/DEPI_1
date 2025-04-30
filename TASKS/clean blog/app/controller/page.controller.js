function index(req,res){
    res.render('pages/index.ejs')
}
function contact(req,res){
    res.render('pages/contact.ejs')
}
function about(req,res){
    res.render('pages/about.ejs')
}
function post(req,res){
    res.render('pages/post.ejs')
}

module.exports={
    index,
    contact,
    about,
    post

}