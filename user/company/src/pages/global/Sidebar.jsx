import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import Avatar from '@mui/material/Avatar';
import logoDashboard from '../../assets/logo.svg'; // Import logo image
import LoginIcon from '@mui/icons-material/Login';

const SidebarAdm = () => {
    return (
        <Sidebar backgroundColor="#C1E1C1" style={{ borderRightStyle: "none" }}>
            <Box className="flex flex-col justify-between h-full">
                <Box>
                    <Box className="pt-3 pb-5 flex justify-center items-center"> {/* Added items-center to center the text */}
                        <img
                            src={logoDashboard} // Use the imported logo image here
                            alt="LOGO"
                            className="h-[60px] w-[60px]" // You might adjust the size as needed
                        />
                        <span className="font-bold ml-2">Skills2.0Match</span> {/* Added ml-2 for spacing */}
                    </Box>
                    <Menu className="text-[#14532d]">
                        <MenuItem icon={<DashboardIcon />}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </MenuItem>
                        <hr className="my-1" /> {/* Add a horizontal line */}
                        <MenuItem icon={<GroupAddIcon />}>
                            <Link to="/admin/users">Users</Link>
                        </MenuItem>
                        <hr className="my-1" /> {/* Add a horizontal line */}
                        <MenuItem icon={<WorkIcon />}>
                            <Link to="/admin/jobs">Jobs</Link>
                        </MenuItem>
                        <hr className="my-1" /> {/* Add a horizontal line */}
                        <MenuItem icon={<CategoryIcon />}>
                            <Link to="/admin/category">Category</Link>
                        </MenuItem>
                        <hr className="my-1" /> {/* Add a horizontal line */}
                    </Menu>
                </Box>
            </Box>
        </Sidebar>
    );
};

export default SidebarAdm;
