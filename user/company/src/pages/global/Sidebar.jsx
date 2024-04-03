import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import WorkIcon from '@mui/icons-material/Work'
import GroupsIcon from '@mui/icons-material/Groups'
import CategoryIcon from '@mui/icons-material/Category'
import { Logout } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import logoDashboard from '../../assets/logo.svg'
import MenuIcon from '@mui/icons-material/Menu';

const SidebarAdm = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(Logout())
  }

  const [activeItem, setActiveItem] = useState('')
  const [collapsed, setCollapsed] = useState(false);

  const handleItemClick = (itemName) => {
    if (activeItem !== itemName) {
      setActiveItem(itemName)
    }
  }

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div style={{ backgroundColor: '#E5E7EB', padding: '0px', margin: '0px' }}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={handleToggleSidebar}
        backgroundColor="#C1E1C1"
        style={{
          borderTopRightRadius: '30px',
          borderBottomRightRadius: '30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          height: '100%',
          marginBottom: 0, // Ensure no margin at the bottom
          marginTop: 15,
          flexDirection: 'column',
        }}
      >
        <Box>
          <Box className="pt-3 pb-5 flex justify-center items-center">
            <img src={logoDashboard} alt="LOGO" className="h-[60px] w-[60px]" />
            {!collapsed && <span className="font-bold ml-2">Skills2.0Match</span>}
          </Box>
          <Menu
            className="text-[#14532d]"
            style={{ paddingLeft: '0', marginLeft: '-16px' }}
          >
            <MenuItem
              icon={<DashboardIcon />}
              className="text-left"
              style={{
                color: activeItem === 'dashboard' ? '#14532d' : '#808080',
              }}
              onClick={() => handleItemClick('dashboard')}
            >
              {!collapsed && <Link to="/AdminDashboard">Overview</Link>}
            </MenuItem>
            <MenuItem
              icon={<GroupAddIcon />}
              className="text-left"
              style={{ color: activeItem === 'users' ? '#14532d' : '#808080' }}
              onClick={() => handleItemClick('users')}
            >
              {!collapsed && <Link to="/admin/users">Users</Link>}
            </MenuItem>
            <MenuItem
              icon={<GroupsIcon />}
              className="text-left"
              style={{
                color: activeItem === 'companies' ? '#14532d' : '#808080',
              }}
              onClick={() => handleItemClick('companies')}
            >
              {!collapsed && <Link to="/admin/companies">Companies</Link>}
            </MenuItem>
            <MenuItem
              icon={<WorkIcon />}
              className="text-left"
              style={{ color: activeItem === 'jobs' ? '#14532d' : '#808080' }}
              onClick={() => handleItemClick('jobs')}
            >
              {!collapsed && <Link to="/admin/jobs">Jobs</Link>}
            </MenuItem>
            <MenuItem
              icon={<CategoryIcon />}
              className="text-left"
              style={{
                color: activeItem === 'category' ? '#14532d' : '#808080',
              }}
              onClick={() => handleItemClick('category')}
            >
              {!collapsed && <Link to="/admin/category">Category</Link>}
            </MenuItem>
          </Menu>
          {!collapsed && (
            <div>
              <div
                style={{
                  paddingLeft: '16px',
                  marginLeft: '-120px',
                  color: '#000000',
                  marginBottom: '5px',
                }}
              >
                <p>Reports</p>
              </div>
              <Menu
                className="text-[#14532d]"
                style={{ paddingLeft: '0', marginLeft: '-16px' }}
              >
                <MenuItem
                  icon={<CategoryIcon />}
                  className="text-left"
                  style={{
                    color: activeItem === 'pinnedReports' ? '#14532d' : '#808080',
                  }}
                  onClick={() => handleItemClick('pinnedReports')}
                >
                  <Link to="/admin/reports/pinned">Pinned Reports</Link>
                </MenuItem>
                <MenuItem
                  icon={<CategoryIcon />}
                  className="text-left"
                  style={{
                    color: activeItem === 'currentReports' ? '#14532d' : '#808080',
                  }}
                  onClick={() => handleItemClick('currentReports')}
                >
                  <Link to="/admin/reports/current">Current Reports</Link>
                </MenuItem>
                <MenuItem
                  icon={<CategoryIcon />}
                  className="text-left"
                  style={{
                    color: activeItem === 'exportReports' ? '#14532d' : '#808080',
                  }}
                  onClick={() => handleItemClick('exportReports')}
                >
                  <Link to="/admin/reports/export">Export Reports</Link>
                </MenuItem>
                <MenuItem
                  icon={<CategoryIcon />}
                  className="text-left"
                  style={{
                    color: activeItem === 'securityReports' ? '#14532d' : '#808080',
                  }}
                  onClick={() => handleItemClick('securityReports')}
                >
                  <Link to="/admin/reports/security">Security Reports</Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Sidebar>
      {/* Button to toggle sidebar */}
      <button 
        onClick={handleToggleSidebar} 
        style={{ position: 'absolute', top: '20px', left: collapsed ? '0' : '200px' }}
      >
        <MenuIcon />
      </button>
    </div>
  )
}

export default SidebarAdm
