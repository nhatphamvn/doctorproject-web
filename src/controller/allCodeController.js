import allCodeService from '../service/allCodeService'

const getAllCode = async (req, res) => {
    try {
        let data = await allCodeService.getAllCodeService(req.query.type);

        if (data.EC !== 0) {
            return res.status(201).json({
                EM: 'Không có allcode!',
                EC: 201,
                DT: null
            });
        }
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: "Lỗi từ server",
            DT: null
        });
    }
}

module.exports = {
    getAllCode
}
