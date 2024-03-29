import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { AiOutlineLogout } from 'react-icons/ai'
import { Logout } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'

// Define your theme here if needed
const theme = {}

const HeaderTop = () => {
  const { user } = useSelector((state) => state.user)
  const profileUrl = user?.profileUrl || ''
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(Logout())
  }

  return (
    <Box
      flexGrow={1}
      boxShadow={1}
      borderRadius={4}
      bgcolor="white"
      p={1}
      mt={2}
      ml={2}
      mr={2}
      mb={2}
    >
      <Toolbar
        style={{
          paddingRight: '10px',
          paddingLeft: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div className="flex items-center gap-4">
          <Avatar src={profileUrl} alt="avatar" />
          <div>
            <Typography
              variant="h6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {user?.firstName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="font-normal"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {user?.email}
            </Typography>
          </div>
        </div>
        <IconButton onClick={handleLogout} style={{ marginLeft: '10px' }}>
          <AiOutlineLogout />
        </IconButton>
      </Toolbar>
    </Box>
  )
}

const ThemedHeaderTop = () => (
  <ThemeProvider theme={theme}>
    <HeaderTop />
  </ThemeProvider>
)

export default ThemedHeaderTop
