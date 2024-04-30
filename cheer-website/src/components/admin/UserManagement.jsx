import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust accordingly
});

function UserManagement() {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchNonAdminUsers();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await api.get(`/api/userAdmin/${email}`);
      alert(`Admin status: ${response.data.admin}`);
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const changeUserStatus = async () => {
    try {
      await api.put(`/api/userStatus/${email}/${status}`);
      alert('User status updated successfully');
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };
const checkRoleStatus = async () => {
  try {
    const response = await api.get(`/api/userRole/${email}`);
    alert(`Role status: ${response.data.role}`);
  } catch (error) {
    console.error('Error checking Role status:', error);
  }
};
  const checkUserDeactivation = async () => {
    try {
      console.log(email);
      const response = await api.get(`/api/userDeactivated/${email}`);
      alert(response.data.Status);
    } catch (error) {
      console.error('Error checking user deactivation:', error);
    }
  };

  const fetchNonAdminUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching non-admin users:', error);
    }
  };

  const removeUser = async (userEmail) => {
    try {
      await api.delete(`/api/user/${userEmail}`);
      alert('User removed successfully');
      fetchNonAdminUsers(); // Refresh the list of users
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };
      

  return (
    <div>
      <h1>User Management</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Email"
      />
      <button onClick={checkRoleStatus}>Check Role Status</button>
      <button onClick={checkAdminStatus}>Check Admin Status</button>
      <button onClick={checkUserDeactivation}>Check Deactivation Status</button>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="admin">Admin</option>
        <option value="disabled">Disabled</option>
        <option value="signup">Signed Up</option>
        <option value="un-signup">Not Signed Up</option>
        {/* Add more status options as needed */}
      </select>
      <button onClick={changeUserStatus}>Change Status</button>
      <h2>Non-Admin Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.email} - <button onClick={() => removeUser(user.email)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
