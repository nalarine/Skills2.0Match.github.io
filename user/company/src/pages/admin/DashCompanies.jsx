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
    fetchCompanies();
  }, []);

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
      } else {
        console.error("Error: Companies data is missing or not an array");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setLoading(false);
    }
  };

  const columns = [
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "about", headerName: "About", width: 200 },
    { 
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span style={{ color: params.row.status === "Pending" ? "orange" : params.row.status === "Approved" ? "green" : "red" }}>
          {params.row.status}
        </span>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: params => (
        <div>
          {params.row.status === "Pending" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApprove(params.row)}
                style={{ marginRight: 5 }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDecline(params.row)}
              >
                Decline
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleApprove = (company) => {
    toast.success(`Company "${company.name}" approved successfully`);
    updateCompanyStatus(company.id, "Approved");
  };

  const handleDecline = (company) => {
    toast.error(`Company "${company.name}" declined`);
    updateCompanyStatus(company.id, "Declined");
  };

  const updateCompanyStatus = async (companyId, status) => {
    try {
      const response = await apiRequest({
        url: `/companies/update-status/${companyId}`,
        method: "PUT",
        data: { status },
      });
      console.log("Company status updated:", response.data);
      fetchCompanies();
    } catch (error) {
      console.error("Error updating company status:", error);
    }
  };

  const style = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "white",
    position: 'relative',
    background: 'radial-gradient(circle, rgba(229,231,235,1) 0%, rgba(193,225,193,1) 100%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    padding: '30px',
  };

  const createCompanyStyle = {
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
  };

  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
    setOpenModal(true);
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

        fetchCompanies();
      } else {
        toast.error(response.message || 'Error creating/updating company');
      }
    } catch (error) {
      console.error(`${editCompany ? 'Error updating company:' : 'Error creating company:'}`, error);
      toast.error(`${editCompany ? 'Error updating company. ' : 'Error creating company. '}Please try again.`);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: "95%" }}>
          <div style={{ marginTop: "0px" }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={{ paddingTop: 0, paddingBottom: 20 }}>
                <DataGrid
                  rows={companies}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{
                    header: {
                      cell: () => null,
                    },
                    toolbar: () => (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <button style={createCompanyStyle} onClick={handleButtonClick}>
                          <AddCircleIcon style={{ marginRight: '5px' }} />
                            Create Company
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
          <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px', fontFamily: 'Poppins, sans-serif' }}>{editCompany ? 'Update' : 'Submit'}</Button>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default DashCompanies;
