import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";
import { createBlog } from "../../redux/features/doctorSlide/actions/doctorActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Blog = () => {
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [image, setImagePreview] = useState(null);
  const [fileBase64, setSelectFile] = useState(null);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const account = useSelector((state) => state.auth.account);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectFile(reader.result);
        setImagePreview(URL.createObjectURL(file));
      };
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // "2025-05-22"
  };

  const resetForm = () => {
    setTitle("");
    setImagePreview("");
    setContent("");
  };

  const handleChange = (value) => {
    setContent(value);
    console.log("📝 Nội dung:", value);
  };
  const handleCreateBlog = () => {
    dispatch(
      createBlog({
        userId: account.id,
        title: title,
        image: fileBase64,
        postHTML: content,
        author: account.username,
        date: formatDate(selectedDate),
      })
    );
    resetForm();
  };

  return (
    <>
      <div className="flex ">
        <div className="w-1/2 py-9 px-4">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            placeholder="Viết bài ở đây..."
            className="w-auto h-96"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full max-w-md">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Nhập Title"
              required
            />
          </div>
          <div className="w-full max-w-md">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Chọn ngày"
            />
          </div>

          <div className="w-full max-w-md flex justify-center">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label
              htmlFor="image"
              className="flex items-center justify-center border-2 w-full h-44 max-w-md text-gray-400 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
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
      </div>
      <div className="flex items-center justify-end mt-8">
        <button
          className="w-36 p-4 text-center py-4 bg-black text-white mr-12 rounded-md hover:bg-gray-800 transition-all duration-200"
          onClick={handleCreateBlog}
        >
          Tạo
        </button>
      </div>
    </>
  );
};

export default Blog;
