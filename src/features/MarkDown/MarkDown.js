import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import Select from "react-select";
import {
  fetchAllDoctors,
  saveDoctors,
  fetchDoctorById,
} from "../../redux/features/doctorSlide/actions/doctorActions";
import {
  fetchPayment,
  fetchProvince,
  fetchPrice,
} from "../UserManagement/redux/allCodeSlides/actions/allcodeActions";

// Markdown parser
const mdParser = new MarkdownIt();

function MarkDown() {
  const [contentHTML, setContentHTML] = useState("");
  const [contentMarkDown, setContentMarkDown] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState("");
  const [payments, setPayment] = useState("");
  const [provinces, setProvince] = useState("");
  const [nameClinic, setNameClinic] = useState("");
  const [addressClinic, setAddressClinic] = useState("");
  const [note, setNote] = useState("");
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const { doctors, doctor } = useSelector((state) => state.doctors);
  const { price, payment, province } = useSelector((state) => state.allcode);

  console.log("check doctor markdown", doctor);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchPayment());
    dispatch(fetchPrice());
    dispatch(fetchProvince());
  }, [dispatch]);

  useEffect(() => {
    if (doctor && doctor?.MarkDown) {
      setContentHTML(doctor.MarkDown.contentHTML || "");
      setContentMarkDown(doctor.MarkDown.contentMarkDown || "");
      setDescription(doctor.MarkDown.description || "");
    }
    if (doctor && doctor?.Doctor_Infor) {
      setPrices(doctor?.Doctor_Infor?.priceId || "");
      setPayment(doctor?.Doctor_Infor?.paymentId || "");
      setProvince(doctor?.Doctor_Infor?.provinceId || "");
      setNameClinic(doctor?.Doctor_Infor?.nameClinic || "");
      setAddressClinic(doctor?.Doctor_Infor?.addressClinic || "");
      setNote(doctor?.Doctor_Infor?.note || "");
      setCount(doctor?.Doctor_Infor?.count || "");
    }
  }, [doctor]);

  const doctorOptions = doctors?.map((doctor) => ({
    value: doctor.id,
    label: doctor.username,
  }));

  const handleSubmit = async () => {
    dispatch(
      saveDoctors({
        contentHTML,
        contentMarkDown,
        description,
        doctorId: selectedOption?.value,
        priceId: prices,
        paymentId: payments,
        provinceId: provinces,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        count: count,
      })
    );
    alert("Đã lưu thành công!");
  };

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkDown(text);
  };
  const handleChageSelected = (options) => {
    setSelectedOption(options);
    dispatch(fetchDoctorById(options.value));
    console.log("handle select doctor", doctor);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center text-2xl text-blue-600 font-sans">
        <h2>Tạo Thông Tin Bác Sĩ</h2>
      </div>

      <div className="flex gap-4">
        {/* Select */}
        <div className="w-full sm:w-1/3">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Chọn Bác Sĩ
          </label>
          <Select
            options={doctorOptions}
            value={selectedOption}
            // onChange={(option) => setSelectedOption(option)}
            onChange={handleChageSelected}
            //handleChange
            placeholder="Chọn Bác Sĩ..."
          />
        </div>

        {/* Textarea */}
        <div className="w-full sm:w-2/3">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nhập mô tả
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập nội dung mô tả..."
          ></textarea>
        </div>
      </div>
      <div className="flex gap-12">
        <div className="w-full sm:w-1/3">
          <select
            value={payments}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Chọn Thanh Toán</option>
            {payment.map((item) => (
              <option key={item.id} value={item.key}>
                {item.valueVi}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/3">
          <select
            value={provinces}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Chọn địa điểm</option>
            {province.map((item) => (
              <option key={item.id} value={item.key}>
                {item.valueVi}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/3">
          <select
            value={prices}
            onChange={(e) => setPrices(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Chọn giá tiền</option>
            {price.map((item) => (
              <option key={item.id} value={item.key}>
                {item.valueVi}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-12">
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Tên phòng khám"
            value={nameClinic}
            onChange={(e) => setNameClinic(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Địa chỉ phòng khám"
            value={addressClinic}
            onChange={(e) => setAddressClinic(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      {/* Markdown Editor */}
      <div>
        <ReactMarkdownEditorLite
          value={contentMarkDown}
          onChange={handleEditorChange}
          className="h-96"
          renderHTML={(text) => mdParser.render(text)}
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          className="px-6 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-400 transition duration-200"
          onClick={handleSubmit}
        >
          Lưu Thông Tin
        </button>
      </div>
    </div>
  );
}

export default MarkDown;
