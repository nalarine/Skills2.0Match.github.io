import React from 'react';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Typography } from '@mui/material'; // Importing Typography from @mui/material
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import Avatar from '@mui/material/Avatar';
import logoDashboard from '../../assets/logo.svg'; // Import logo image
import { Logout } from '../../redux/userSlice';
import { AiOutlineLogout } from 'react-icons/ai'; // Import Logout icon
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux

const SidebarAdm = () => {
    const { user } = useSelector((state) => state.user); // Using useSelector to access user state
    const profileUrl = user?.profileUrl || '';
    const dispatch = useDispatch(); // Using useDispatch to dispatch actions

    const handleLogout = () => {
        dispatch(Logout());
    };

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
                            <Link to="/AdminDashboard">Dashboard</Link>
                        </MenuItem>
                        <hr className="my-1" /> {/* Add a horizontal line */}
                        <MenuItem icon={<GroupAddIcon />}>
                            <Link to="/admin/users">Users</Link>
                        </MenuItem>
                        <hr className="my-1" /> {/* Add a horizontal line */}
                        <MenuItem icon={<GroupsIcon />}>
                            <Link to="/admin/companies">Companies</Link>
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
                <div className="flex flex-col gap-6 items-center py-5">
                    <div className="flex items-center gap-4">
                        <Avatar src={profileUrl} alt="avatar" />
                        <div>
                            <Typography variant="h6">{user?.firstName}</Typography>
                            <Typography variant="body2" color="textSecondary" className="font-normal">
                                {user?.email}
                            </Typography>
                        </div>
                    </div>
                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="group flex items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-green-500 hover:text-white"
                    >
                        <AiOutlineLogout className="text-gray-600 mr-2 h-5 w-5" aria-hidden="true" />
                        Log Out
                    </button>
                </div>
            </Box>
        </Sidebar>
    );
};

export default SidebarAdm;
