import {useEffect, useState} from 'react'
import User from './User'
import {ApiGetAllUser} from '../../../service/apiUserServices'
import ModalUpdateUser from '../Modal/ModalUpdateUser'
import ModalDeleteUser from '../Modal/ModalDeleteUser'
import ModalCreateUsers from '../Modal/ModalCreateUsers'
import CustomerDetails from '../CustomerDetails'
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
    const [listUser,setListUser]= useState([])
    const [showCreateUser,setShowCreateUser] = useState(false)
    const [showUpdateUser,setShowUpdateUser] = useState(false)
    const [showDeleteUser,setShowDeleteUser] = useState(false)
    const [dataUpdate,setDataUpdate] = useState({})
    const [dataDelete,setDataDelete] = useState({});
    const [dataUser,setDataUser] = useState({});  
    const navigate = useNavigate()
    useEffect(()=>{


        fetchDataUser()

    },[])

    const fetchDataUser =async()=>{
        try {
            const data = await ApiGetAllUser();
    
            if(data.EC !== 0){
                alert(data.EM)
                
            }else{
                setListUser(data.DT)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleCreateUser=()=>{
        setShowCreateUser(true)
    }

    const handleShowUser =(user)=>{
        navigate('/system/user')
        setDataUser(user)
    }


    const handleUpdateUser=(user)=>{
        setShowUpdateUser(true)
        setDataUpdate(user)
    }

    const handleDeleteUser=(user)=>{
        setShowDeleteUser(true)
        setDataDelete(user)
    }



    return (
    <>
    <div>
        <div>
            <User
            handleShowUser={handleShowUser}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
            handleCreateUser={handleCreateUser}
            listUser={listUser}
            />
        </div>

        {/* <div>
            <CustomerDetails
            dataUser={dataUser}
            
            />
        </div> */}
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
    )
    }

export default ManageUser
