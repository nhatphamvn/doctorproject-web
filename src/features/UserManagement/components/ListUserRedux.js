import React from "react";

const ListUserRedux = ({
  handleUpdateUser,
  handleDeleteUser,
  listUser,
  handleCreateUsers,
}) => {
  console.log("users data", listUser);
  return (
    <>
      <div className="mb-4">
        <button
          className="p-2 rounded-md bg-green-500 text-white"
          onClick={handleCreateUsers}
        >
          Tạo Người Dùng
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center text-red-600 border">
          Manager List Users
        </h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="border border-gray-300 px-4 py-2 text-left">
                STT
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Username
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(listUser || []).map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.username}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => handleUpdateUser(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteUser(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUserRedux;
