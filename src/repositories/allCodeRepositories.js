import db from "../models"


const getAllCodes = async (typeInput) => {
    try {
        const data = await db.Allcode.findAll({
            where :{type:typeInput}
        });

        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return null;
    }
};



module.exports ={
  getAllCodes

}
