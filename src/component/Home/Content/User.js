import React from 'react'
const User = (props) => {
  const {handleShowUser,handleUpdateUser,handleDeleteUser,listUser,handleCreateUser} = props



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center font-bold text-red-600">Manager List Users</h1>
      <div className='mb-4'>
        <span className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
        onClick={handleCreateUser}>
            Tạo Một Users
        </span>

      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">STT</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((item, index) => (
            <tr key={index} className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200`}>
              <td className="border border-gray-300 px-4 py-2 ">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2 ">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.username}</td>

              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" 
                onClick={()=>handleShowUser(item)}>View</button>
                <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={()=>handleUpdateUser(item)}>Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={()=>handleDeleteUser(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User
