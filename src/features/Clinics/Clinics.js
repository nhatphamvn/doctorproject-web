import { useState } from "react";
import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { CiImageOn } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { createClinics } from "../../redux/features/doctorSlide/actions/doctorActions";

// Markdown parser
const mdParser = new MarkdownIt();

const Clinics = () => {
  const [fileBase64, setSelectFile] = useState(null);
  const [ClinicName, setClinicName] = useState("");
  const [descriptionMarkDown, setDescriptionMarkDown] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const resetForm = () => {
    setImage("");
    setAddress("");
    setDescriptionHTML("");
    setDescriptionMarkDown("");
    setClinicName("");
  };

  const handleSubmit = async () => {
    dispatch(
      createClinics({
        name: ClinicName,
        descriptionHTML,
        descriptionMarkDown,
        address,
        image: fileBase64,
      })
    );
    alert("oke");
    resetForm();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectFile(reader.result);
        setImage(URL.createObjectURL(file));
      };
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setDescriptionHTML(html);
    setDescriptionMarkDown(text);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      <div className="text-center text-3xl font-semibold text-blue-700">
        <h2>Tạo Cơ Sở Phòng Khám</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input tên chuyên khoa */}
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tên Cơ Sở Phòng Khám
          </label>
          <input
            type="text"
            placeholder="Nhập chuyên khoa"
            value={ClinicName}
            onChange={(e) => setClinicName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Textarea mô tả */}
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Địa Chỉ
          </label>
          <textarea
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập địa chỉ..."
          />
        </div>

        {/* Upload hình ảnh */}
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chọn Hình Ảnh
          </label>
          {/* Input Upload (ẩn) */}
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />

          {/* Label bọc preview, click trực tiếp được */}
          <label
            htmlFor="image"
            className="flex items-center justify-center ml-2 border-solid border-2 w-72 h-32 text-gray-400 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <span className="text-3xl text-gray-700">
                <CiImageOn />
              </span>
            )}
          </label>
        </div>
      </div>

      {/* Markdown Editor */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nội dung chi tiết
        </label>
        <ReactMarkdownEditorLite
          value={descriptionMarkDown}
          onChange={handleEditorChange}
          className="h-[400px] border border-gray-300 rounded-md shadow-sm"
          renderHTML={(text) => mdParser.render(text)}
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition"
        >
          Lưu Thông Tin
        </button>
      </div>
    </div>
  );
};

export default Clinics;
