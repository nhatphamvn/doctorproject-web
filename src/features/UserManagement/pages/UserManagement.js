import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import { ApiGetAllUser, ApiGetAllDocters } from "../services/userService";
import ModalUpdateUser from "../modals/ModalUpdateUsers";
import ModalDeleteUser from "../modals/ModalDeleteUsers";
import ModalCreateUsers from "../modals/ModalCreateUsers";

import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [listUser, setListUser] = useState([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataUser, setDataUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const data = await ApiGetAllUser();
      const res = await ApiGetAllDocters(2);
      console.log("check data doctor", res);

      if (data.EC !== 0) {
        alert(data.EM);
      } else {
        setListUser(data.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateUser = () => {
    setShowCreateUser(true);
  };

  const handleShowUser = (user) => {
    navigate("/system/user");
    setDataUser(user);
  };

  const handleUpdateUser = (user) => {
    setShowUpdateUser(true);
    setDataUpdate(user);
  };

  const handleDeleteUser = (user) => {
    setShowDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <>
      <div>
        <div>
          <UserTable
            handleShowUser={handleShowUser}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
            handleCreateUser={handleCreateUser}
            listUser={listUser}
          />
        </div>
        <ModalCreateUsers
          show={showCreateUser}
          setShow={setShowCreateUser}
          fetchDataUser={fetchDataUser}
        />

        <ModalUpdateUser
          show={showUpdateUser}
          setShow={setShowUpdateUser}
          dataUpdate={dataUpdate}
          fetchDataUser={fetchDataUser}
        />

        <ModalDeleteUser
          show={showDeleteUser}
          setShow={setShowDeleteUser}
          dataDelete={dataDelete}
          fetchDataUser={fetchDataUser}
        />
      </div>
    </>
  );
};

export default UserManagement;
