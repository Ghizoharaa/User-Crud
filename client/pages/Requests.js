import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function Requests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await axios.get('http://localhost:4001/requests');
                setRequests(response.data);
                console.log(response.data); // Check if data is received
            } catch (err) {
                console.error(err);
            }
        }
        fetchRequests();
    }, []);

    async function handleDeleteRequest(id) {
        console.log('Deleting user with id:', id);
        try {
            await axios.delete(`http://localhost:4001/requests/${id}`);
            setRequests(requests.filter(request => request._id !== id));
        } catch (err) {
            console.error(err);
        }
    }
    async function handleDisplayRequest(requestId) {
      console.log('Displaying request with id:', requestId);
      try {
          const response = await axios.get(`http://localhost:4001/requests/${requestId}`);
          window.open(`data:application/json,${encodeURIComponent(JSON.stringify(response.data))}`);
      } catch (err) {
          console.error(err);
      }
    }
    



    return (
        <div className="container">
        <h1>Requests</h1>
        <table className="table table-bordered">
            <thead className="thead-dark">
            <tr>
                <th>id</th>
                <th>Full Name</th>
                <th>Company's name</th>
                <th>Project type</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Confirm Phone Number</th>
                <th>Comment</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            
            {requests.map(request => (
                <tr key={request._id} onClick={() => handleDisplayRequest(request._id)}>

                    <td>{request._id}</td>
                    <td>{request.fullname}</td>
                    <td>{request.company}</td>
                    <td>{request.type}</td>
                    <td>{request.email}</td>
                    <td>{request.phone}</td>
                    <td>{request.confirmPhone}</td>
                    <td>{request.comment}</td>
                    <td>
                        <button className='btn' >
                            <FontAwesomeIcon icon={faEdit} size="lg" color="#333" style={{ marginRight: '10px' }} />
                            </button>
                        <button className='btn'>
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#333" onClick={() => handleDeleteRequest(request._id)} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Requests;