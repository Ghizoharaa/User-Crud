import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function News() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:4001/posts');
                setPosts(response.data);
                console.log(response.data); // Check if data is received
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, []);

    async function handleDeleteUser(id) {
        console.log('Deleting user with id:', id);
        try {
            await axios.delete(`http://localhost:4001/post/${id}`);
            setPosts(posts.filter(post => post._id !== id));
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div className="container">
        <h1>Posts</h1>
        <button class="btn btn-primary">Add Post</button>
        <table className="table table-bordered">
            <thead className="thead-dark">
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
                
            </tr>
            </thead>
            <tbody>
            
            {posts.map(post => (
                <tr key={post._id}>
                    <td>{post._id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    
                    <td>
                        <button className='bttn' >
                            <FontAwesomeIcon icon={faEdit} size="lg" color="#333" style={{ marginRight: '10px' }} />
                            </button>
                        <button className='bttn'>
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#333" onClick={() => handleDeleteUser(post._id)} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default News;