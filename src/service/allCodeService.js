import allCodeRepositories from '../repositories/allCodeRepositories'

const getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await allCodeRepositories.getAllCodes(typeInput); // nên dùng await
            if (!typeInput) {
                resolve({
                    EM: 'Không có allcode!',
                    EC: 1,
                    DT: null
                });
            } else {
                resolve({
                    EM: 'Tìm kiếm allcode thành công!',
                    EC: 0,
                    DT: data
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllCodeService
};
