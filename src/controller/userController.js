import userApiService from '../service/userApiService';

const userReadById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ EM: "Missing user ID", EC: 400, DT: null });
        }

        const data = await userApiService.ApiGetUserById(id);

        if (!data || !data.DT) {
            return res.status(404).json({ EM: data.EM, EC: data.EC, DT: null });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in userReadById:", error);
        return res.status(500).json({ EM: "Internal server error", EC: 500, DT: null });
    }
};


const userReadAllUsers = async (req, res) => {
    try {
        const users = await userApiService.ApiGetAllUsers();

        // Kiểm tra DT có dữ liệu hay không
        if (!users.DT || users.DT.length === 0) {
            return res.status(404).json({ EM: 'No users found', EC: 404, DT: null });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ EM: 'Internal server error', EC: 500, DT: null });
    }
};


const userCreateNewDB = async (req, res) => {
    try {
        const { username, email, password,phone,address } = req.body;

        if (!email || !password) {
            return res.status(400).json({ EM: 'Missing required fields', EC: 400, DT: null });
        }

        const newUser = await userApiService.ApiCreateUser(
            username, 
            email,
            address,
            phone, 
            password);

        if (!newUser.DT) {
            return res.status(400).json({ EM: newUser.EM, EC: newUser.EC, DT: null });
        }

        return res.status(201).json(newUser);
    } catch (e) {
        return res.status(500).json({ EM: 'Internal server error', EC: 500, DT: null });
    }
};

const userUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, phone, address } = req.body;

        // Kiểm tra đầu vào hợp lệ
        if (!id || !username || !phone || !address) {
            return res.status(400).json({ EM: "Thiếu thông tin bắt buộc", EC: 400, DT: null });
        }

        const updatedUser = await userApiService.ApiUpdateUser(id, username, phone, address);

        if (updatedUser.EC !== 0) {
            return res.status(400).json({ EM: updatedUser.EM, EC: updatedUser.EC, DT: null });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ EM: "Lỗi server nội bộ", EC: 500, DT: null });
    }
};


const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
 
        const deletedUser = await userApiService.ApiDelete(id);
        if (!id) {
            return res.status(400).json({ EM: deletedUser.EM, EC: deletedUser.EC, DT: null });
        }
        if (!deletedUser || !deletedUser.DT) {
            return res.status(404).json({ EM: deletedUser.EM, EC: deletedUser.EC, DT: null });
        }

        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(500).json({ EM: 'Internal server error', EC: 500, DT: null });
    }
};

module.exports = {
    userReadById,
    userReadAllUsers,
    userCreateNewDB,
    userUpdate,
    userDelete
};
