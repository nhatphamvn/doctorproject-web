import doctorService from "../service/doctorService";

const getAllDoctor = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let data = await doctorService.getAllDoctorService(limit);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có doctor!",
        EC: 201,
        DT: null,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server",
      DT: null,
    });
  }
};

module.exports = {
  getAllDoctor,
};
