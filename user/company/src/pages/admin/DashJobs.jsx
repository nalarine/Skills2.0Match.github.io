import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { apiRequest } from "../../utils/index";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    company: "",
    location: "",
    desc: "",
    requirements: ""
  });

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

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewJob({
      jobTitle: "",
      company: "",
      location: "",
      desc: "",
      requirements: ""
    });
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
      if (selectedJob) {
        response = await apiRequest({
          url: `/jobs/edit-job/${selectedJob.id}`,
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
      if (selectedJob) {
        const index = updatedData.findIndex(job => job.id === selectedJob.id);
        updatedData[index] = { ...response.data, id: response.data._id };
      } else {
        updatedData.push({ ...response.data, id: response.data._id });
      }
      setData(updatedData);
      
      // Display toast notification for successful job creation/editing
      toast.success(selectedJob ? "Job edited successfully" : "Job created successfully");
    } catch (error) {
      console.error("Error posting/editing job:", error);
    }
  };
  

  const handleView = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
    setNewJob(job);
  };

  const columns = [
    { field: "jobTitle", headerName: "Job Title", width: 130 },
    { field: "company", headerName: "Company", width: 140 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: params => (
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
            onClick={() => handleView(params.row)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const style = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "white",
    position: 'relative',
    background: 'radial-gradient(circle, rgba(229,231,235,1) 0%, rgba(193,225,193,1) 100%)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    padding: '30px',
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: "90%" }}>
          <div style={{ marginTop: "0px" }}>
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
          <h2 id="modal-modal-title" style={{ textAlign: 'center' }}>{selectedJob ? 'View Job' : 'Post New Job'}</h2>
          <TextField
            fullWidth
            label="Job Title"
            variant="outlined"
            margin="normal"
            name="jobTitle"
            value={newJob.jobTitle}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="Company"
            variant="outlined"
            margin="normal"
            name="company"
            value={newJob.company}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            margin="normal"
            name="location"
            value={newJob.location}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            name="desc"
            value={newJob.desc}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="Requirements"
            variant="outlined"
            margin="normal"
            name="requirements"
            value={newJob.requirements}
            InputProps={{ readOnly: true }}
          />
          {!selectedJob && <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px' }}>Submit</Button>}
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DashJobs;
