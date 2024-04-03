import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';

const DashJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiRequest({
          url: '/jobs/alljobs',
          method: 'GET',
        });
        console.log('API Response:', response);

        if (response.data && Array.isArray(response.data)) {
          const modifiedJobs = response.data.map((job) => ({
            ...job,
            id: job._id,
            jobType: job.jobType || '', // Populate jobType
            vacancies: job.vacancies || 0, // Populate vacancies
          }));
          setData(modifiedJobs);
          setLoading(false);
        } else {
          console.error('Error: Jobs data is missing or not an array');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const columns = [
    { field: 'jobTitle', headerName: 'Job Title', width: 130 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'jobType', headerName: 'Job Type', width: 150 },
    { field: 'vacancies', headerName: 'Vacancies', width: 100, align: 'center' },
  ];

  const rowStyle = {
    borderBottom: '1px solid #000',
    padding: '5px',
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '90%' }}>
          <div style={{ marginTop: '0px' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{
                  toolbar: CustomToolbar, // Custom toolbar component
                }}
                rowStyle={(params) => ({
                  borderBottom: '1px solid #000',
                  ...rowStyle,
                })}
                rowClassName="datagrid-row"
                headerClassName="datagrid-header"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: 'white',
                  position: 'relative',
                  background: 'radial-gradient(circle, rgba(229,231,235,1) 0%, rgba(193,225,193,1) 100%)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
                  borderRadius: '10px',
                  padding: '30px',
                  height: '600px',
                }}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: 'lightgreen', // Replace 'lightblue' with your desired color
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

// Custom toolbar component
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { 
            variant: 'contained', // Set the button variant to 'contained' for solid style
            style: { 
              background: '#4CAF50', // Set background color to green
              color: 'white', // Set text color to white
            },
          },
        }}
      />
    </GridToolbarContainer>
  );
}

export default DashJobs;
