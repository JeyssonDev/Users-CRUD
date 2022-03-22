import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/UserForm.css";

const UsersForm = ({setShowForm, getUsers, userSelected, setUserSelected}) => {

    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        if(userSelected){
            setName(userSelected.first_name);
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setBirthday(userSelected.birthday)
        }
    }, [userSelected])
    

    const submit = (e) =>{
        e.preventDefault();
        
        const user = {
            email,
            password,
            first_name: name,
            last_name: lastname,
            birthday
        }
        if(userSelected){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
            .then(() => {
                    getUsers();
                    setUserSelected(null);
                    reset();
                    setShowForm(false);
                });
        } else {    
            axios.post('https://users-crud1.herokuapp.com/users/', user)
                .then(() => {
                    getUsers();
                    reset();
                })
        }
    }

    const reset = () =>{
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setBirthday("");
    }

  return (
    <div className="content-form">
        <form className=" animate__animated animate__fadeInDownBig" onSubmit={submit}>
        <h3 className="button-new-user">{userSelected !== null ? "Edit User" : "New User"}</h3>
        <div className="button-cancel">
        <button
            className="cancel-button"
            onClick={() => setShowForm(false)}
            >x
        </button>
        </div>
        <input
            type="text"
            onChange={e => setName(e.target.value)}
            name="first_name"
            placeholder="Enter the user's first name"
            value={name}
        />
        <input
            type="text"
            onChange={e => setLastName(e.target.value)}
            name="last_name"
            placeholder="Enter the user's last name"
            value={lastname}
        />
        <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            name="email"
            placeholder="Enter the user's email"
            value={email}
        />
        <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            name="password"
            placeholder="Enter the user's password"
            value={password}
        />
        <input
            type="date"
            onChange={e => setBirthday(e.target.value)}
            name="birthday"
            placeholder="Enter the user's date of birth"
            value={birthday}
        />
        <button 
                type="submit"
                className="add-user">
                {userSelected !== null ? "Edit User" : "Add New User"}
        </button>
        </form>
    </div>
  );
};

export default UsersForm;