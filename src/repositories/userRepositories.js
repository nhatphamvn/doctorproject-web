
import db from "../models"


const createUser = async (userData)=>{
    return await db.User.create(userData)
}

const getAllUsers = async ()=>{
    return await db.User.findAll()
}

const getUserById = async (id)=>{
    return await db.User.findOne({where :{id}})
}

const updateUser = async (id, newData) => {
    const [affectedRows] = await db.User.update(newData, { where: { id } });

    if (affectedRows === 0) {
        return null; // Không có user nào được cập nhật
    }

    // Trả về user sau khi cập nhật
    return await db.User.findOne({ where: { id } });
}


const deleteUser = async (id)=>{
    return await db.User.destroy({where:{id}})
}

module.exports ={
    createUser,getAllUsers,getUserById,updateUser,deleteUser

}
