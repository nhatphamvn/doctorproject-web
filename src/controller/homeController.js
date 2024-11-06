import mysql from 'mysql2/promise';

// Create the connection to database




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

    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    });

    try {


    const [results, fields] = await connection.query(
        'INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)',
        [username, email, password]  // Thay thế các biến này bằng dữ liệu thực tế
    );

    console.log(results); // results chứa thông tin về kết quả thực thi, chẳng hạn như ID của hàng vừa được thêm vào
    } catch (err) {
    console.log(err); // Xử lý lỗi, nếu có
    }
        
    return res.send('insert success database')
    }

module.exports ={
    handleHelloWorld,handleHomePage,handleCreateUsers
}