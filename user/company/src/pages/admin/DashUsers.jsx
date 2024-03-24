import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from MUI
import { apiRequest } from "../../utils/index";

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest({
          url: "/users/allusers",
          method: "GET",
        });
        console.log("API Response:", response); // Log the response
        const modifiedUsers = response.data.users.map(user => ({ ...user, id: user._id })); // Add id property
        setUsers(modifiedUsers); // Set modified users array with id property
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 170 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: params => (
        <div>
          <button style={{ marginRight: 5, backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
          <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
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
  );
};

export default DashUsers;
