import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ApiUpdateUsers } from "../services/userService";
import _ from "lodash";

Modal.setAppElement("#root");

const ModalUpdateUser = ({ show, setShow, dataUpdate, fetchDataUser }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setUsername(dataUpdate.username);
      setPhoneNumber(dataUpdate.phone);
      setAddress(dataUpdate.address);
      setGender(dataUpdate.gender);
    }
    console.log("update", dataUpdate);
  }, [dataUpdate]);

  const handleClose = () => {
    setUsername("");
    setPhoneNumber("");
    setAddress("");
    setGender("");
    setShow(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      const data = await ApiUpdateUsers(
        dataUpdate.id,
        username,
        phone,
        address,
        gender
      );

      if (data && data.EC === 0) {
        handleClose();
        await fetchDataUser();
      }
      if (data && data.EC !== 0) {
        console.log(data.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <Modal
          isOpen={show}
          // onRequestClose={() => setModalIsOpen(false)}
          className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-semibold">Update Users</h2>
          <div>
            <label className="block py-2 text-gray-700">Tên của bạn</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block py-2 text-gray-700">Số Điện Thoại</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block py-2 text-gray-700">Địa chỉ</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block py-2 text-gray-700">Giới tính</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              className="mt-4 mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleSubmitUpdate}
            >
              Save
            </button>
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ModalUpdateUser;
