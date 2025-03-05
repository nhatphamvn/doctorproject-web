import { useState } from 'react';
import Modal from 'react-modal';
import { ApiCreateNewUsers } from '../services/userService';
import { validateForm } from '../../../utils/validate/formValidation';

Modal.setAppElement('#root');

const ModalCreateUsers = ({show, setShow, fetchDataUser}) => {

    const [username, setUsername] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [password, setPassword] = useState(''); // ✅ Sửa lỗi undefined
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});

    const handleClose = () => setShow(false);

    const handleCreateUsers = async () => {
        const validationErrors = validateForm({ username, email, phone, address, password });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        try {
            // ✅ Truyền thêm password vào API
            const data = await ApiCreateNewUsers(username, email, phone, address, gender, password);

            if (data && data.EC === 0) {
                handleClose();
                await fetchDataUser();
            } else {
                console.log(data?.EM || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Lỗi khi tạo user:', error);
        }
    };

    return (
        <>
            <div className="bg-gray-100">
                <Modal
                    isOpen={show}
                    className="bg-white p-6 rounded-lg shadow-lg w-2/3 mx-auto outline-none"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <h2 className="text-xl font-semibold">Tạo Accounts</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Username */}
                        <div>
                            <label className="block py-2 text-gray-700">Tên của bạn</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm px-4">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block py-2 text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm px-4">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block py-2 text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm px-4">{errors.password}</p>}
                        </div>

                        {/* Số điện thoại */}
                        <div>
                            <label className="block py-2 text-gray-700">Số Điện Thoại</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-sm px-4">{errors.phone}</p>}
                        </div>

                        {/* Địa chỉ */}
                        <div>
                            <label className="block py-2 text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {errors.address && <p className="text-red-500 text-sm px-4">{errors.address}</p>}
                        </div>

                        {/* Giới tính */}
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
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="mt-4 mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={handleCreateUsers}
                        >
                            Create
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

export default ModalCreateUsers;
