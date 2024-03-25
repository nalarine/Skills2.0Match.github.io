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

const DashCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
    contact: "",
    about: "",
    jobPosts: ""
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiRequest({
          url: "/companies/allcompanies",
          method: "GET",
        });
  
        if (response.data && Array.isArray(response.data)) {
          const modifiedCompanies = response.data.map(company => ({
            ...company,
            id: company._id
          }));
          setCompanies(modifiedCompanies);
          setLoading(false);
          return modifiedCompanies; // Return modified companies array
        } else {
          console.error("Error: Companies data is missing or not an array");
          setLoading(false);
          return []; // Return empty array if no data
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
        return []; // Return empty array if error occurs
      }
    };
    const fetchData = async () => {
      const companiesData = await fetchCompanies();
      setCompanies(companiesData);
    };
    fetchData();
  }, []);
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "about", headerName: "about", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: params => (
        <div>
          <button
            style={{
              marginRight: 5,
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </button>
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const style = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "white",
  };


  const createCompanyStyle = {
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

  const handleEdit = (company) => {
    setEditCompany(company);
    setNewCompany(company);
    setOpenModal(true);
  };

  const handleDelete = (company) => {
    setEditCompany(company);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditCompany(null);
    setNewCompany({
      name: "",
      contact: "",
      about: "",
      jobPosts: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (editCompany) {
        response = await apiRequest({
          url: `/companies/edit-company/${editCompany.id}`,
          method: 'PUT',
          data: newCompany,
        });
      } else {
        response = await apiRequest({
          url: "/companies/create-company",
          method: "POST",
          data: newCompany
        });
      }
  
      console.log("Company created/updated:", response.data);
  
      if (response.success) {
        setOpenModal(false);
        if (editCompany) {
          toast.success('Company updated successfully');
        } else {
          toast.success('Company created successfully');
        }
  
        const updatedCompanies = await fetchCompanies();
        setCompanies(updatedCompanies);
      } else {
        toast.error(response.message || 'Error creating/updating company');
      }
    } catch (error) {
      console.error(`${editCompany ? 'Error updating company:' : 'Error creating company:'}`, error);
      toast.error(`${editCompany ? 'Error updating company. ' : 'Error creating company. '}Please try again.`);
    }
  };
  
  

  const confirmDelete = async () => {
    try {
      const response = await apiRequest({
        url: `/delete/${editCompany.id}`,
        method: "DELETE",
      });
      console.log("Company deleted:", response.data);
      setDeleteConfirmationOpen(false);
      toast.success("Company deleted successfully");

      // Refresh the companies list after deletion
      const updatedCompanies = await fetchCompanies();
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Error deleting company. Please try again.");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: "90%" }}>
        <button style={createCompanyStyle} onClick={handleButtonClick}>
          <AddCircleIcon style={{ marginRight: '5px' }} />
          Create Company
        </button>
        <div style={{ marginTop: "50px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataGrid
            rows={companies}
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
    <h2 id="modal-modal-title" style={{ textAlign: 'center' }}>{editCompany ? 'Edit Company' : 'Create New Company'}</h2>
    <TextField
      fullWidth
      label="Company Name"
      variant="outlined"
      margin="normal"
      name="name"
      value={newCompany.name}
      onChange={handleInputChange}
      style={{ marginBottom: '10px' }}
      InputProps={{
        style: { fontFamily: 'Poppins, sans-serif' }
      }}
    />
    <TextField
      fullWidth
      label="Contact"
      variant="outlined"
      margin="normal"
      name="contact"
      value={newCompany.contact}
      onChange={handleInputChange}
      style={{ marginBottom: '10px' }}
      InputProps={{
        style: { fontFamily: 'Poppins, sans-serif' }
      }}
    />
    <TextField
      fullWidth
      label="About"
      variant="outlined"
      margin="normal"
      name="about"
      value={newCompany.about}
      onChange={handleInputChange}
      style={{ marginBottom: '10px' }}
      InputProps={{
        style: { fontFamily: 'Poppins, sans-serif' }
      }}
    />
    <TextField
      fullWidth
      label="Email"
      type="email"
      variant="outlined"
      margin="normal"
      name="email"
      value={newCompany.email}
      onChange={handleInputChange}
      style={{ marginBottom: '10px' }}
      InputProps={{
        style: { fontFamily: 'Poppins, sans-serif' }
      }}
    />
    <TextField
      fullWidth
      label="Password"
      type="password"
      variant="outlined"
      margin="normal"
      name="password"
      value={newCompany.password}
      onChange={handleInputChange}
      style={{ marginBottom: '20px' }}
      InputProps={{
        style: { fontFamily: 'Poppins, sans-serif' }
      }}
    />
    <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px', fontFamily: 'Poppins, sans-serif' }}>{editCompany ? 'Update' : 'Submit'}</Button>
  </Box>
</Modal>


      <Modal
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 5, width: 400, fontFamily: 'Poppins, sans-serif' }}>
          <h1 id="delete-confirmation-modal-title" style={{ textAlign: 'center' }}>Confirm Deletion</h1>
          <p id="delete-confirmation-modal-description" style={{ marginBottom: '10px', textAlign: 'center' }}>Are you sure you want to delete this company?</p>
          <Button variant="contained" onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white', marginLeft: '30px', fontFamily: 'Poppins, sans-serif' }}>Yes, Delete</Button>
          <Button variant="contained" onClick={cancelDelete} style={{ backgroundColor: '#4CAF50', color: 'white', marginLeft: '30px', fontFamily: 'Poppins, sans-serif' }}>Cancel</Button>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default DashCompanies;
     
