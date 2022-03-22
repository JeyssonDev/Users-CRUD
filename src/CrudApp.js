import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import './styles/CrudApp.css'

const CrudApp = () => {

    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [userSelected, setUserSelected] = useState(null);

    useEffect(() => {
        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setUsers(res.data));
    }, []);

    const getUsers = () => {
        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setUsers(res.data));
    };

    const deleteProduct = id =>{
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(() => getUsers());
    }

    const selectUser = users =>{
        setUserSelected(users)
        setShowForm(true)
    };

  return (
    <>  

        <h1 className='title-page'>Users</h1>
        <button className='create-user'
            onClick={() => setShowForm(!showForm)}>
            <i className="fa-regular fa-plus"></i>
            Create new user
        </button>

        {
            showForm &&
            <UsersForm
                getUsers = {getUsers}
                setShowForm = {setShowForm}
                userSelected = {userSelected}
                setUserSelected = {setUserSelected}
            />
        }
        <UsersList
            users={users}
            selectUser={selectUser}
            getUsers = {getUsers}
            deleteProduct = {deleteProduct}
        />
    </>
  )
}

export default CrudApp