import { useEffect, useState } from "react";
import ListUserRedux from "../components/ListUserRedux";
import { fetchUsers } from "../redux/userSlides/actions/userActions";
import ReduxUpdateUsers from "../modals/ReduxUpdateUsers";
import ReduxDeleteUsers from "../modals/ReduxDeleteUsers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserManageRedux = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleCreateUsers = () => {
    navigate("/system/user-redux");
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
          <ListUserRedux
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
            listUser={users}
            handleCreateUsers={handleCreateUsers}
          />

          <ReduxUpdateUsers
            show={showUpdateUser}
            setShow={setShowUpdateUser}
            dataUpdate={dataUpdate}
          />

          <ReduxDeleteUsers
            show={showDeleteUser}
            setShow={setShowDeleteUser}
            dataDelete={dataDelete}
            fetchDataUser={fetchUsers}
          />
        </div>
      </div>
    </>
  );
};

export default UserManageRedux;
