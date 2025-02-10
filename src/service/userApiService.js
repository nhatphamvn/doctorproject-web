import userRepository from '../repositories/userRepositories'
import bcrypt from 'bcryptjs';

//GET
const ApiGetUserById = async(id)=>{

    try {
        const userData = await userRepository.getUserById(id)
        if(!userData){
            return({
                EM:'Không có người dùng!',
                EC:1,
                DT:null
            });
        }
        return({
            EM:'Tìm kiếm người dùng thành công!',
            EC:0,
            DT:userData
        })

    } catch (error) {
        return({
            EM:'Lỗi truy xuất người dùng!',
            EC:500,
            DT:null
        })
    }
}

const ApiGetAllUsers =async()=>{
    try {
        const users = await userRepository.getAllUsers();
        if(!users){
            return({
                EM:'Không có ngưỜi dùng nào trong dữ liệu!',
                EC:1,
                DT:null
            });
        }
        return({
            EM:'Tìm kiếm thành công!',
            EC:0,
            DT:users
        })
    } catch (error) {
        return({
            EM:'Lỗi truy xuất dữ liệu!',
            EC:500,
            DT:null
        })
    }
    
}
//POST
const ApiCreateUser = async (username, email, address, phone,gender ) => {
    try {
        // const salt = bcrypt.genSaltSync(10);
        // const hashPassword = bcrypt.hashSync(password, salt);

        // Tạo user mới
        const newUser = await userRepository.createUser({
            username,
            email,
            address,
            phone,
            gender,
            // password: hashPassword
        });

        return {
            EM: "Bạn đã tạo thành công người dùng!",
            EC: 0,
            DT: {
                id: newUser.id
            }
        };
    } catch (error) {
        console.error(error);
        return {
            EM: "Lỗi tạo người dùng!",
            EC: 500,
            DT: null
        };
    }
};

//PUT
const ApiUpdateUser = async (id, username, phone, address) => {
    try {
  
        if (!id) {
            return {
                EM: "ID không hợp lệ",
                EC: 400,
                DT: null
            };
        }

        const updateUser = await userRepository.updateUser(id, { username, phone, address });

        if (!updateUser) {
            return {
                EM: "Người dùng không được tìm thấy",
                EC: 1,
                DT: null
            };
        }

        return {
            EM: "Sửa đổi thành công người dùng",
            EC: 0,
            DT: updateUser
        };
    } catch (error) {
        console.error("Error updating user:", error);
        return {
            EM: "Lỗi chỉnh sửa người dùng",
            EC: 500,
            DT: null
        };
    }
};

const ApiDelete =async (id)=>{
    try {
        const deleted = await userRepository.deleteUser(id)
        if(!deleted){
            return({
                EM:'Không tìm thấy người dùng!',
                EC:1,
                DT:null
            })
        }
        return({
            EM:'Đã xoá thành công người dùng',
            EC:0,
            DT:deleted
        })
    } catch (error) {
        return({
            EM:'Lỗi khi xoá người dùng!',
            EC:500,
            DT:null
        })
    }
//DELETE    
}

module.exports ={
    ApiUpdateUser,ApiDelete,ApiGetAllUsers,ApiGetUserById,ApiCreateUser
}