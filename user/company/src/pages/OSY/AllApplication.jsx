import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiRequest } from "../../utils";
import { useSelector } from "react-redux"; // Importing useSelector to access user from Redux store

const columns = [
  { field: "companyName", headerName: "Company", minWidth: 200, flex: 1 },
  { field: "hiringStage", headerName: "Hiring Stage", minWidth: 200, flex: 1 },
  { field: "appliedDate", headerName: "Applied Date", minWidth: 200, flex: 1 },
  { field: "jobRole", headerName: "Job Role", minWidth: 200, flex: 1 },
  { field: "action", headerName: "Action", minWidth: 200, flex: 1 },
];

export default function AllApplicants() {
  const { user } = useSelector((state) => state.user); // Accessing user from Redux store
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest({
          url: "/companies/get-company/" + user._id,
          method: "GET",
        });
        console.log("API Response:", res); // Log the API response
        if (res.data && res.data.applicants) {
          setTableData(res.data.applicants);
        } else {
          console.log("No applicants found in the response:", res);
        }
      } catch (error) {
        console.error("Error fetching company data:", error); // Log any errors that occur
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData(); // Call fetchData function to fetch data when component mounts
  }, [user]); // Adding user to dependency array to refetch data when user changes

  // Render loading state if data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}> {/* Set a fixed container size */}
      <div className="flex flex-col p-3 gap-5" style={{ height: "100%" }}> {/* Set a fixed container size */}
        <div>
          <span className="text-3xl font-black">
            Total Applied Jobs: {tableData.length}
          </span>
        </div>
        <div style={{ width: "100%", height: "calc(100% - 2.5rem)", overflowY: "auto" }}> {/* Set a fixed height and overflow-y:auto */}
          <DataGrid
            rows={tableData}
            columns={columns}
            pagination
            pageSize={10}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
}
