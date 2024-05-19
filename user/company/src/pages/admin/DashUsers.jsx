import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    password: '',
    userType: 'user',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;
  const [startDate, endDate] = dateRange;

  function calculateAge(birthdate) {
    const birthday = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      console.log(`Fetching users for page: ${page}`);
      const response = await apiRequest({
        url: '/users/allusers',
        method: 'GET',
        params: {
          page,
          limit: usersPerPage,
        },
      });
      console.log('API response:', response);
      const modifiedUsers = response.data.users.map((user) => ({
        ...user,
        id: user._id,
        birthdate: user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'N/A',
        age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setUsers(modifiedUsers);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchUsersWithDateRange();
    } else {
      fetchUsers(currentPage);
    }
  }, [startDate, endDate, currentPage]);

  const fetchUsersWithDateRange = async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const response = await apiRequest({
        url: '/users/allusers',
        method: 'GET',
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          page: currentPage,
          limit: usersPerPage,
        },
      });
      console.log('API response with date range:', response);
      const modifiedUsers = response.data.users.map((user) => ({
        ...user,
        id: user._id,
        birthdate: user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'N/A',
        age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setUsers(modifiedUsers);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users with date range:', error);
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    setOpenModal(true);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      birthdate: '',
      password: '',
      userType: 'user',
    });
    setEditUser(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditUser(null);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      birthdate: '',
      password: '',
      userType: 'user',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const endpoint = editUser ? `/users/edit-user/${editUser.id}` : '/users/create';
      const method = editUser ? 'PUT' : 'POST';
      await apiRequest({
        url: endpoint,
        method,
        data: newUser,
      });
      toast.success(`${editUser ? 'User updated' : 'User created'} successfully`);
      setOpenModal(false);
      fetchUsers(currentPage);
    } catch (error) {
      toast.error(`${editUser ? 'Error updating user' : 'Error creating user'}. Please try again.`);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setNewUser(user);
    setOpenModal(true);
  };

  const handleDelete = (user) => {
    setEditUser(user);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await apiRequest({
        url: `/users/delete/${editUser.id}`,
        method: 'DELETE',
      });
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== editUser.id));
      setDeleteConfirmationOpen(false);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user. Please try again.');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    console.log(`Page changed to: ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 mt-[100px]">
      <div className="flex gap-2">
        <div className="flex mb-4 w-[50%]">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="py-2 px-4 rounded-lg border border-gray-300 w-full"
          />
        </div>
      </div>
      <div className="px-4 py-2 flex justify-between items-center bg-gray-50">
        <h1 className="text-xl text-gray-700 font-bold">Applicants</h1>
        <button
          onClick={handleButtonClick}
          className="bg-green-700 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded"
        >
          Create Account
        </button>
      </div>
      <div>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
<th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">
                Name
              </th>
<th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">
                Email
              </th>
<th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">
                Birthdate
              </th>
<th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">
                Age
              </th>
<th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">
                Date Created
              </th>
<th className="px-6 py-4 font-sm text-green-900 font-semibold text-base">
                Actions
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredUsers.map((user) => (
              <tr className="hover:bg-gray-50" key={user.id}>
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.birthdate}</td>
                <td className="px-6 py-4">{user.age}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 text-left">{user.createdAt}</div>
                </td>
                <td className="px-6 py-4 flex justify-start gap-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-green-700 p-2 px-4 rounded-md text-slate-100 font-semibold text-md hover:text-slate-600 hover:bg-lime-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="bg-red-700 p-2 px-4 rounded-md text-slate-100 font-semibold text-md hover:text-slate-600 hover:bg-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav className="bg-white rounded-md border border-gray-200">
            <ul className="flex">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className="cursor-pointer">
                  <button
                    className={`relative block p-2 px-4 border text-sm leading-5 font-medium focus:z-10 focus:outline-none transition ease-in-out duration-150 ${
                      currentPage === i + 1
                        ? 'text-green-700 border-green-700 bg-green-50'
                        : 'text-gray-700 border-gray-300 hover:text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <ToastContainer />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{editUser ? 'Edit User' : 'Create User'}</h2>
          <TextField
            label="First Name"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birthdate"
            name="birthdate"
            type="date"
            value={newUser.birthdate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User Type"
            name="userType"
            value={newUser.userType}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            {editUser ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Modal>

      <Modal open={deleteConfirmationOpen} onClose={cancelDelete}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="contained" color="secondary" onClick={confirmDelete}>
              Yes
            </Button>
            <Button variant="contained" color="primary" onClick={cancelDelete}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DashUsers;
