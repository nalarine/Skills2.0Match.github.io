import React, { useState, useEffect } from 'react'
import { apiRequest } from '../../utils/index'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const DashUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    password: '',
    userType: 'user',
  })

  function calculateAge(birthdate) {
    const birthday = new Date(birthdate)
    const today = new Date()
    let age = today.getFullYear() - birthday.getFullYear()
    const m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--
    }
    return age
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest({
          url: '/users/allusers',
          method: 'GET',
        })
        const modifiedUsers = response.data.users.map((user) => ({
          ...user,
          id: user._id,
          birthdate: user.birthdate
            ? new Date(user.birthdate).toLocaleDateString()
            : 'N/A',
          age: user.birthdate ? calculateAge(user.birthdate) : 'N/A',
        }))
        setUsers(modifiedUsers)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleButtonClick = () => {
    setOpenModal(true)
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: 'user',
    })
    setEditUser(null)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setEditUser(null)
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: 'user',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const endpoint = editUser
        ? `/users/edit-user/${editUser.id}`
        : '/users/create'
      const method = editUser ? 'PUT' : 'POST'
      const response = await apiRequest({
        url: endpoint,
        method,
        data: newUser,
      })
      toast.success(
        `${editUser ? 'User updated' : 'User created'} successfully`,
      )
      setOpenModal(false)
      fetchUsers() // Refresh users list
    } catch (error) {
      toast.error(
        `${editUser ? 'Error updating user' : 'Error creating user'}. Please try again.`,
      )
    }
  }

  const handleEdit = (user) => {
    setEditUser(user)
    setNewUser(user)
    setOpenModal(true)
  }

  const handleDelete = (user) => {
    setEditUser(user)
    setDeleteConfirmationOpen(true)
  }

  const confirmDelete = async () => {
    try {
      await apiRequest({
        url: `/users/delete/${editUser.id}`,
        method: 'DELETE',
      })
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== editUser.id))
      setDeleteConfirmationOpen(false)
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Error deleting user. Please try again.')
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md mt-[100px]">
      <div className="px-4 py-2 flex justify-between items-center bg-gray-50">
        <h1 className="text-xl text-gray-700 font-bold">Applicants</h1>
        <button
          onClick={handleButtonClick}
          className="bg-green-700 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded"
        >
          Create Account
        </button>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr>
            <th className="px-6 py-4 font-medium text-green-900 font-semibold text-base">
              Name
            </th>
            <th className="px-6 py-4 font-medium text-green-900 font-semibold text-base">
              Email
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Birthdate</th>
            
            <th className="px-6 py-4 font-medium text-gray-900">Age</th>
            <th className="px-6 py-4 font-medium text-green-900 font-semibold text-base">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {users.map((user) => (
            <tr className="hover:bg-gray-50" key={user.id}>
              <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                <img
                  src={user.profileUrl || 'default-profile.png'}
                  alt={`${user.firstName} ${user.lastName}`}
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                {user.firstName} {user.lastName}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.birthdate}</td>
              <td className="px-6 py-4">{user.age}</td>
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
      <ToastContainer />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <h2 id="modal-modal-title" style={{ textAlign: 'center' }}>
            {editUser ? 'Edit User' : 'Create New User'}
          </h2>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            InputProps={{
              style: { fontFamily: 'Poppins, sans-serif' },
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            InputProps={{
              style: { fontFamily: 'Poppins, sans-serif' },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            InputProps={{
              style: { fontFamily: 'Poppins, sans-serif' },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { fontFamily: 'Poppins, sans-serif' },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              marginTop: '10px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {editUser ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
            width: 400,
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <h1
            id="delete-confirmation-modal-title"
            style={{ textAlign: 'center' }}
          >
            Confirm Deletion
          </h1>
          <p
            id="delete-confirmation-modal-description"
            style={{ marginBottom: '10px', textAlign: 'center' }}
          >
            Are you sure you want to delete this user?
          </p>
          <Button
            variant="contained"
            onClick={confirmDelete}
            style={{
              backgroundColor: 'red',
              color: 'white',
              marginLeft: '30px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Yes, Delete
          </Button>
          <Button
            variant="contained"
            onClick={cancelDelete}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              marginLeft: '30px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default DashUsers