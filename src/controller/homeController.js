
const handleHelloWorld =(req,res)=>{
    return res.render("home.ejs")
}

const handleHomePage =(req,res)=>{
    return res.render("user.ejs")
}

module.exports ={
    handleHelloWorld,handleHomePage
}