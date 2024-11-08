import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const createNewUser =async(username,email,password)=>{
    const salt = bcrypt.genSaltSync(10);
    
    const hashPassword = bcrypt.hashSync(password, salt);

    console.log('hash password',hashPassword);
    
    const check = bcrypt.compareSync(password, hashPassword);
    console.log('compared password',check);
    
    // true

    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    });

    try {
    const [results, fields] = await connection.query(
        'INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)',
        [username, email, hashPassword]  // Thay thế các biến này bằng dữ liệu thực tế
    );

    console.log(results); // results chứa thông tin về kết quả thực thi, chẳng hạn như ID của hàng vừa được thêm vào
    } catch (err) {
    console.log(err); // Xử lý lỗi, nếu có
    }
        

}

module.exports ={
    createNewUser
}