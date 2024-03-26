import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { apiRequest } from "../../utils/index";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "user",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest({
          url: "/users/allusers",
          method: "GET",
        });
        const modifiedUsers = response.data.users.map(user => ({ ...user, id: user._id }));
        setUsers(modifiedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)} style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', marginRight: '5px', cursor: 'pointer' }}>Edit</button>
          <button onClick={() => handleDelete(params.row)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
        </div>
      ),
    },
  ];

  const style = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "white",
    position: 'relative',
  };

  const createUserStyle = {
    backgroundColor: buttonClicked ? 'green' : 'white',
    color: buttonClicked ? 'white' : 'green',
    border: 'none',
    borderRadius: 5,
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '10px',
    right: '60px',
    transition: 'background-color 0.3s',
  };

  const handleButtonClick = () => { // Define handleButtonClick function
    setButtonClicked(!buttonClicked);
    setOpenModal(true);
  };

  const handleCloseModal = () => { // Define handleCloseModal function
    setOpenModal(false);
    setEditUser(null);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "user",
    });
  };

  const handleInputChange = (e) => { // Define handleInputChange function
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (editUser) {
        response = await apiRequest({
          url: `/users/edit-user/${editUser.id}`,
          method: 'PUT',
          data: newUser,
        });
      } else {
        response = await apiRequest({
          url: "/users/create",
          method: "POST",
          data: newUser
        });
      }

      console.log("User created/updated:", response.data);
      setOpenModal(false);
      toast.success(`${editUser ? 'User updated' : 'User created'} successfully`);

      if (editUser) {
        const updatedUsers = users.map(user => {
          if (user.id === editUser.id) {
            return {
              ...user,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password
            };
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error(`${editUser ? 'Error updating user:' : 'Error creating user:'}`, error);
      toast.error(`${editUser ? 'Error updating user. ' : 'Error creating user. '}Please try again.`);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenModal(true);
    setNewUser(user);
  };

  const handleDelete = (user) => {
    setEditUser(user);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await apiRequest({
        url: `/users/delete/${editUser.id}`, // Assuming the delete endpoint is /users/delete/:id
        method: "DELETE",
      });
      // Remove the deleted user from the local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== editUser.id));
      setDeleteConfirmationOpen(false);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again.");
    }
  };
  
  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: "90%" }}>
          <button style={createUserStyle} onClick={handleButtonClick}>
            <AddCircleIcon style={{ marginRight: '5px' }} />
            Create Account
          </button>
          <div style={{ marginTop: "50px" }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{
                  header: {
                    cell: () => null,
                  },
                }}
                style={{ ...style, height: 600 }}
              />
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 5, width: 400, maxHeight: '80vh', overflowY: 'auto', fontFamily: 'Poppins, sans-serif' }}>
          <h2 id="modal-modal-title" style={{ textAlign: 'center' }}>{editUser ? 'Edit User' : 'Create New User'}</h2>
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
              style: { fontFamily: 'Poppins, sans-serif' }
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
              style: { fontFamily: 'Poppins, sans-serif' }
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
              style: { fontFamily: 'Poppins, sans-serif' }
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
              style: { fontFamily: 'Poppins, sans-serif' }
            }}
          />
          <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px', fontFamily: 'Poppins, sans-serif' }}>{editUser ? 'Update' : 'Submit'}</Button>
        </Box>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 5, width: 400, fontFamily: 'Poppins, sans-serif' }}>
          <h1 id="delete-confirmation-modal-title" style={{ textAlign: 'center' }}>Confirm Deletion</h1>
          <p id="delete-confirmation-modal-description" style={{ marginBottom: '10px', textAlign: 'center' }}>Are you sure you want to delete this user?</p>
          <Button variant="contained" onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white', marginLeft: '30px', fontFamily: 'Poppins, sans-serif' }}>Yes, Delete</Button>
          <Button variant="contained" onClick={cancelDelete} style={{ backgroundColor: '#4CAF50', color: 'white', marginLeft: '30px', fontFamily: 'Poppins, sans-serif' }}>Cancel</Button>
        </Box>
      </Modal>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default DashUsers;
