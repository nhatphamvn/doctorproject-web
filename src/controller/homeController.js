import userServices from '../service/userServices'




const handleHelloWorld =(req,res)=>{
    return res.render("home.ejs")
}

const handleHomePage =async(req,res)=>{


    const users =await userServices.getListUsers()

    return res.render("user.ejs",{users})
}

const handleCreateUsers = async(req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    
    userServices.createNewUser(username,email,password)

   return res.redirect("/users")
}

const handleDeleteUsers =async(req,res)=>{

    await userServices.deleteListUser(req.params.id)

    return res.redirect("/users")
}

module.exports ={
    handleHelloWorld,handleHomePage,handleCreateUsers,handleDeleteUsers
}