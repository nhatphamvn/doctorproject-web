import bcrypt from 'bcryptjs';
import connection from './db'
import db from '../models';
import { where } from 'sequelize/lib/sequelize';


const createNewUser =async(username,email,password)=>{
    const salt = bcrypt.genSaltSync(10);
    
    const hashPassword = bcrypt.hashSync(password, salt);

    // console.log('hash password',hashPassword);
    
    // const check = bcrypt.compareSync(password, hashPassword);
    // console.log('compared password',check);
    
    // true
    try {
        await db.User.create({
            username:username,
            email:email,
            password:hashPassword
        })

    // console.log(results); // results chứa thông tin về kết quả thực thi, chẳng hạn như ID của hàng vừa được thêm vào
    } catch (err) {
    console.log(err); // Xử lý lỗi, nếu có
    }

}

const getListUsers =async() =>{
    try {
        // // Thực hiện truy vấn SELECT
        // const [results, fields] = await connection.query(
        //     'SELECT * FROM `users`',
        // );
        // // console.log(results); // Hiển thị kết quả truy vấn
        // return results; // Trả về kết quả nếu cần
        let users = []
        users = await db.User.findAll();
        return users


    } catch (err) {
        console.log(err); // Xử lý lỗi nếu có
    }

    await connection.end();
}
const deleteListUser=async(id)=>{
    try {
        await db.User.destroy({
            where:{id : id}
        })
    // // Thực hiện truy vấn DELETE
    // const [results] = await connection.query(
    //     'DELETE FROM `users` WHERE `id` = ?',
    //     [id] // Thay `id` bằng giá trị cụ thể bạn muốn xóa
    // );
    // return results; // Trả về kết quả nếu cần
    } catch (err) {
    console.log(err); // Xử lý lỗi nếu có
    }
}
const updateListUser = async (id) => {
    try {
        let users = {}

        users = await db.User.findOne({
            where : {id :id}
        })
        // // Thực hiện truy vấn SELECT
        // const [results] = await connection.query(
        //     'SELECT id, username, email FROM users WHERE id = ?',
        //     [id]
        // );
        
        // return results; // Trả về kết quả nếu cần
        return users.get({plain:true})

    } catch (err) {
        console.log(err); // Xử lý lỗi nếu có
    }
};
const createUpdateUsers =async(id,username,email)=>{
    try {
    // const [results] = await connection.query(
    //     'UPDATE `users` SET `username` = ?, `email` = ? WHERE `id` = ?',
    //     [username, email, id] // userId là ID người dùng cần cập nhật
    // );

    // // Kiểm tra kết quả
    // if (results.affectedRows > 0) {
    //     console.log('Cập nhật thành công');
    // } else {
    //     console.log('Không tìm thấy người dùng với ID này');
    // }
    await db.User.update(
    {
        username:username,
        email:email
    },
    {
        where:{id:id}
    })

} catch (err) {
    console.log(err); // Xử lý lỗi nếu có
}

}




module.exports ={
    createNewUser,getListUsers,deleteListUser,updateListUser,createUpdateUsers
}