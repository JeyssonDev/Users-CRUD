import React from 'react'
import '../styles/UsersList.css'
import Swal from 'sweetalert2'

const UsersList = ({users, selectUser, deleteProduct, setShowForm}) => {

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
              )
            }
          })
    }
    
    return (    
        <ul className='users-list'>
            {
                users.map(user => (
                    <li key={user.id}>
                        <h3>
                            {user.first_name} {user.last_name}
                        </h3>
                        <hr />
                        <p> 
                            <span className='text-paragraph'>MAIL</span>
                            <br />
                            {user.email}
                        </p>
                        <p> 
                            <span className='text-paragraph'>BIRTHDAY</span> 
                            <br/>
                            <i className="fa-solid fa-cake-candles"></i>
                            {user.birthday}
                        </p>
                        <hr />
                        <button
                            onClick={() => handleDelete(user.id)}
                            className='button-delete'>
                            <i className="fa-regular fa-trash-can">
                            </i>
                        </button>
                        <button
                            onClick={() => selectUser(user)}
                            className='button-edit'>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </li>
                ))
            }
        </ul>
    );
};

export default UsersList