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

const DashJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    company: "",
    location: "",
    desc: "",
    requirements: ""
  });
  const [editJob, setEditJob] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiRequest({
          url: "/jobs/alljobs",
          method: "GET",
        });
        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data)) {
          const modifiedJobs = response.data.map(job => ({ ...job, id: job._id }));
          setData(modifiedJobs);
          setLoading(false);
        } else {
          console.error("Error: Jobs data is missing or not an array");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewJob({
      jobTitle: "",
      company: "",
      location: "",
      desc: "",
      requirements: ""
    });
    setEditJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (editJob) {
        response = await apiRequest({
          url: `/jobs/edit-job/${editJob.id}`,
          method: "PUT",
          data: newJob
        });
      } else {
        response = await apiRequest({
          url: "/jobs/create-job",
          method: "POST",
          data: newJob
        });
      }
      console.log("Job posted/edited:", response.data);
      setOpenModal(false);
      const updatedData = [...data];
      if (editJob) {
        const index = updatedData.findIndex(job => job.id === editJob.id);
        updatedData[index] = { ...response.data, id: response.data._id };
      } else {
        updatedData.push({ ...response.data, id: response.data._id });
      }
      setData(updatedData);
      
      // Display toast notification for successful job creation/editing
      toast.success(editJob ? "Job edited successfully" : "Job created successfully");
    } catch (error) {
      console.error("Error posting/editing job:", error);
    }
  };
  

  const handleEdit = (job) => {
    setEditJob(job);
    setOpenModal(true);
    setNewJob(job);
  };

  const handleDelete = (job) => {
    setEditJob(job);
    setDeleteConfirmationOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await apiRequest({
        url: `/jobs/delete-job/${editJob.id}`,
        method: "DELETE"
      });
      const updatedData = data.filter(job => job.id !== editJob.id);
      setData(updatedData);
      setDeleteConfirmationOpen(false);
      
      // Display toast notification for successful job deletion
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const columns = [
    { field: "jobTitle", headerName: "Job Title", width: 130 },
    { field: "company", headerName: "Company", width: 140 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      valueGetter: params => params.row.detail[0]?.desc || "",
    },
    {
      field: "requirements",
      headerName: "Requirements",
      width: 200,
      valueGetter: params => params.row.detail[0]?.requirements || "",
    },
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

  const createJobStyle = {
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
    right: '5px',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ position: 'relative', marginTop: '7%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: "100%" }}>
          <button style={createJobStyle} onClick={handleButtonClick} >
            <AddCircleIcon style={{ marginRight: '5px' }} />
            Post Job
          </button>
          <div style={{ marginTop: "50px" }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
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
          <h2 id="modal-modal-title" style={{ textAlign: 'center' }}>{editJob ? 'Edit Job' : 'Post New Job'}</h2>
          <TextField
            fullWidth
            label="Job Title"
            variant="outlined"
            margin="normal"
            name="jobTitle"
            value={newJob.jobTitle}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Company"
            variant="outlined"
            margin="normal"
            name="company"
            value={newJob.company}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            margin="normal"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            name="desc"
            value={newJob.desc}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Requirements"
            variant="outlined"
            margin="normal"
            name="requirements"
            value={newJob.requirements}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px' }}>{editJob ? 'Update' : 'Submit'}</Button>
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
          <h2 id="delete-confirmation-modal-title" style={{ textAlign: 'center' }}>Confirm Deletion</h2>
          <p id="delete-confirmation-modal-description" style={{ marginBottom: '10px', textAlign: 'center' }}>Are you sure you want to delete this job?</p>
          <Button variant="contained" onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white', marginLeft: '30px' }}>Yes, Delete</Button>
          <Button variant="contained" onClick={cancelDelete} style={{ backgroundColor: '#4CAF50', color: 'white', marginLeft: '30px' }}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DashJobs;
