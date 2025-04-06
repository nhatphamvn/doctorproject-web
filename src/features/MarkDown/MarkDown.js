import React, { useState } from "react";
import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import Select from "react-select";

// Markdown parser
const mdParser = new MarkdownIt();

function MarkDown() {
  const [contentHTML, setContentHTML] = useState("");
  const [contentMarkDown, setContentMarkDown] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];

  const handleSubmit = () => {
    alert("Đã lưu thành công!");
    console.log("Loại trái cây:", selectedOption);
    console.log("Mô tả:", description);
    console.log("Markdown:", contentMarkDown);
    console.log("HTML:", contentHTML);
  };

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkDown(text);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center text-2xl text-blue-600 font-mono">
        <h2>Tạo Thông Tin Bác Sĩ</h2>
      </div>

      <div className="flex gap-4">
        {/* Select */}
        <div className="w-full sm:w-1/3">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Chọn loại trái cây
          </label>
          <Select
            options={options}
            value={selectedOption}
            onChange={(option) => setSelectedOption(option)}
            placeholder="Chọn một loại trái cây..."
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
