import bcrypt from 'bcryptjs';
import connection from './db'

const createNewUser =async(username,email,password)=>{
    const salt = bcrypt.genSaltSync(10);
    
    const hashPassword = bcrypt.hashSync(password, salt);

    // console.log('hash password',hashPassword);
    
    // const check = bcrypt.compareSync(password, hashPassword);
    // console.log('compared password',check);
    
    // true
    try {
    const [results, fields] = await connection.query(
        'INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)',
        [username, email, hashPassword]  // Thay thế các biến này bằng dữ liệu thực tế
    );

    // console.log(results); // results chứa thông tin về kết quả thực thi, chẳng hạn như ID của hàng vừa được thêm vào
    } catch (err) {
    console.log(err); // Xử lý lỗi, nếu có
    }

}

const getListUsers =async() =>{
    try {
        // Thực hiện truy vấn SELECT
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`',
        );

        // console.log(results); // Hiển thị kết quả truy vấn
        return results; // Trả về kết quả nếu cần
    } catch (err) {
        console.log(err); // Xử lý lỗi nếu có
    }

    await connection.end();
}
const deleteListUser=async(id)=>{
    try {
    // Thực hiện truy vấn DELETE
    const [results] = await connection.query(
        'DELETE FROM `users` WHERE `id` = ?',
        [id] // Thay `id` bằng giá trị cụ thể bạn muốn xóa
    );
    return results; // Trả về kết quả nếu cần
    } catch (err) {
    console.log(err); // Xử lý lỗi nếu có
    }
}



module.exports ={
    createNewUser,getListUsers,deleteListUser
}