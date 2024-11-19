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
const handleUpdateUsers =async(req,res)=>{


    const id = req.params.id
    const users = await userServices.updateListUser(id)
    let userData ={}
    // if(users && users.length >0 ){
    //     userData = users[0]
    // }
    // console.log("users >>>>",users);
    userData = users
    


    return res.render("updateUser.ejs",{userData})
}
const handleCreateUpdateUsers =async(req,res)=>{
    const id = req.body.id
    const username =req.body.username
    const email = req.body.email

    await userServices.createUpdateUsers(id,username,email)

    return res.redirect("/users")
}

module.exports ={
    handleHelloWorld,handleHomePage,handleCreateUsers,handleDeleteUsers,handleUpdateUsers,handleCreateUpdateUsers
}