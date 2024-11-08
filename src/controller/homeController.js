import userServices from '../service/userServices'




const handleHelloWorld =(req,res)=>{
    return res.render("home.ejs")
}

const handleHomePage =(req,res)=>{
    return res.render("user.ejs")
}

const handleCreateUsers = async(req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    
    userServices.createNewUser(username,email,password)

    return res.send('Insert database success!!')

    }

module.exports ={
    handleHelloWorld,handleHomePage,handleCreateUsers
}