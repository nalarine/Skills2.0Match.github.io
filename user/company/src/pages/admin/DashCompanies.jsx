import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from MUI
import { apiRequest } from "../../utils/index";

const DashCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiRequest({
          url: "/companies/allcompanies",
          method: "GET",
        });
        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data)) {
          const modifiedCompanies = response.data.map(company => ({
            ...company,
            id: company._id,
            jobPosts: company.jobPosts.join(", "), // Convert jobPosts array to comma-separated string
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
    fetchCompanies();
  }, []);

  // Define columns for the companiesGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "contact", headerName: "Contact", width: 200 },
    { field: "about", headerName: "About", width: 150 },
    { field: "jobPosts", headerName: "Job Posts", width: 200 }, // Display job posts
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
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Apply font family to all text
  const style = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "white",
  };

  // Center the grid on the page
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={centerStyle}>
      <div style={{ width: "90%" }}>
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
  );
};

export default DashCompanies;
