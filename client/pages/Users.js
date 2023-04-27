import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
        const response = await axios.get('http://localhost:4000/user');
        setUsers(response.data);
        console.log(response.data.users)
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/user/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
            console.log(error);
            }
        };


    return (
        <div class="container">
        <h1>Users</h1>
        <table class="table table-bordered">
            <thead class="thead-dark">
            <tr>
                <th>id</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            
            {users.map(user => (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.username}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className='btn' >
                            <FontAwesomeIcon icon={faEdit} size="lg" color="#333" style={{ marginRight: '10px' }} />
                            </button>
                        <button className='btn'>
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#333" onClick={() => handleDelete(user._id)} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Users;