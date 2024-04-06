import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { apiRequest } from '../../utils/index'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Avatar } from '@material-tailwind/react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DashUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'user',
  })

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

  const columns = [
    {
      field: 'profileUrl',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {params.row.profileUrl ? (
            <Avatar
              alt={`${params.row.firstName} ${params.row.lastName}`}
              src={params.row.profileUrl}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50px',
                marginRight: 10,
              }}
            />
          ) : (
            <Avatar
              alt={`${params.row.firstName} ${params.row.lastName}`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50px',
                marginRight: 10,
              }}
            />
          )}
        </div>
      ),
      sortable: false, // Disable sorting on the avatar column
      filterable: false, // Disable filtering on the avatar column
      resizable: false, // Disable resizing on the avatar column
      hide: false, // Ensure the column is not hidden
      headerAlign: 'center', // Align the header text to the center
      align: 'center', // Align the cell content to the center
      disableColumnMenu: true, // Disable the column menu
      disableColumnSelector: true, // Disable the column selector
    },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'age', headerName: 'Age', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params.row)}
            style={{
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              marginRight: '5px',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  const style = {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: 'white',
    position: 'relative',
    background:
      'radial-gradient(circle, rgba(229,231,235,1) 0%, rgba(193,225,193,1) 100%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    padding: '30px',
  }

  const createUserStyle = {
    backgroundColor: buttonClicked ? 'green' : 'white',
    color: buttonClicked ? 'white' : 'green',
    border: 'none',
    borderRadius: 20,
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '10px',
    right: '60px',
    transition: 'background-color 0.3s',
  }

  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked)
    setOpenModal(true)
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
      let response
      if (editUser) {
        response = await apiRequest({
          url: `/users/edit-user/${editUser.id}`,
          method: 'PUT',
          data: newUser,
        })
      } else {
        response = await apiRequest({
          url: '/users/create',
          method: 'POST',
          data: newUser,
        })
      }

      console.log('User created/updated:', response.data)
      setOpenModal(false)
      toast.success(
        `${editUser ? 'User updated' : 'User created'} successfully`,
      )

      if (editUser) {
        const updatedUsers = users.map((user) => {
          if (user.id === editUser.id) {
            return {
              ...user,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password,
            }
          }
          return user
        })
        setUsers(updatedUsers)
      }
    } catch (error) {
      console.error(
        `${editUser ? 'Error updating user:' : 'Error creating user:'}`,
        error,
      )
      toast.error(
        `${editUser ? 'Error updating user. ' : 'Error creating user. '}Please try again.`,
      )
    }
  }

  const handleEdit = (user) => {
    setEditUser(user)
    setOpenModal(true)
    setNewUser(user)
  }

  const handleDelete = (user) => {
    setEditUser(user)
    setDeleteConfirmationOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await apiRequest({
        url: `/users/delete/${editUser.id}`, // Assuming the delete endpoint is /users/delete/:id
        method: 'DELETE',
      })
      // Remove the deleted user from the local state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== editUser.id),
      )
      setDeleteConfirmationOpen(false)
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Error deleting user. Please try again.')
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '98%' }}>
          <div style={{ marginTop: '80px' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={{ paddingTop: 0, paddingBottom: 20 }}>
                <DataGrid
                  rows={users}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{
                    header: {
                      cell: () => null,
                    },
                    toolbar: () => (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '10px',
                        }}
                      >
                        <button
                          style={createUserStyle}
                          onClick={handleButtonClick}
                        >
                          <AddCircleIcon style={{ marginRight: '5px' }} />
                          Create Account
                        </button>
                      </div>
                    ),
                  }}
                  style={{ ...style, height: 'calc(100% - 40px)' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
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
      {/* Toast Container */}
      <ToastContainer />
    </div>
  )
}

export default DashUsers
