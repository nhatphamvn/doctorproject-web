import { useState, useEffect } from "react";
import { getListPatientDoctor } from "../../../service/otherUserService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import ModalCheckPatient from "../modal/ModalCheckPatient";

const CheckPatient = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [show, setShowCheckPatient] = useState(false);
  const [dataPatient, setDataPatient] = useState({});

  const account = useSelector((state) => state.auth.account);

  console.log("check appointments", appointments);

  const handleSCheckPatient = (item) => {
    setShowCheckPatient(true);
    setDataPatient(item);
  };

  // Hàm format date về yyyy-mm-dd
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // "2025-05-22"
  };

  useEffect(() => {
    if (account?.id && selectedDate) {
      fetchListPatient();
    }
  }, [account?.id, selectedDate]);

  const fetchListPatient = async () => {
    try {
      const formattedDate = formatDate(selectedDate);
      const res = await getListPatientDoctor(account.id, formattedDate);
      if (res && res.EC === 0) {
        setAppointments(res.DT); // Giả sử API trả về res.data là mảng
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    }
  };

  const handleConfirm = (id) => {};

  return (
    <div className="p-6 space-y-6">
      <div className="text-center text-2xl text-blue-600 font-sans">
        <h2>Xác nhận lịch hẹn</h2>
      </div>

      {/* Chọn ngày */}
      <div>
        <div className="w-96 sm:w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chọn Ngày
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-96 p-1.5 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Chọn ngày"
          />
        </div>
        <div>
          <p className="text-gray-700 text-sm">
            Ngày bạn chọn:{" "}
            <strong>{selectedDate.toLocaleDateString("vi-VN")}</strong>
          </p>
        </div>
      </div>

      {/* Bảng danh sách lịch hẹn */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Danh sách lịch hẹn
        </h3>
        <table className="table-auto border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Tên</th>
              <th className="px-4 py-2 border">Số Điện Thoại</th>
              <th className="px-4 py-2 border">Khung giờ</th>
              <th className="px-4 py-2 border">Giới Tính</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">
                    {item.patientData?.username || "Không có tên"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.patientData?.phone || "Không có tên"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.timeData.valueEn}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.patientData.genderData.valueVi}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={() => handleSCheckPatient(item)}
                    >
                      Xác nhận
                    </button>
                    {/* <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      Báo lịch
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Không có lịch hẹn nào trong ngày này.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalCheckPatient
        show={show}
        data={dataPatient}
        setShow={setShowCheckPatient}
        account={account}
        onSuccess={fetchListPatient}
      />
    </div>
  );
};

export default CheckPatient;
