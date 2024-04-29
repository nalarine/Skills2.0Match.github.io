import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import Popover from '@mui/material/Popover' // Import Popover
import Scrollbar from '../../pages/admin2/components/scrollbar/scrollbar'
import Typography from '@mui/material/Typography' // Import Typography
import Divider from '@mui/material/Divider' // Import Divider
import Avatar from '@mui/material/Avatar' // Import Avatar
import Button from '@mui/material/Button' // Import Button
import Tooltip from '@mui/material/Tooltip' // Import Tooltip
import Iconify from '../../pages/admin2/components/iconify/iconify'
import { fToNow } from '../../pages/admin2/utils/format-time'
import Box from '@mui/material/Box'

const NotificationsPopover = ({ newJobDetails }) => {
  if (!newJobDetails) {
    return null // Render nothing if newJobDetails is undefined
  }

  const totalUnRead = newJobDetails.filter(
    (item) => item.isUnread === true,
  ).length

  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAllAsRead = () => {
    // Your logic to mark all as read
  }

  // Function to generate notification message based on hiring stage
  const getNotificationMessage = (job) => {
    switch (job.hiringStage) {
      case 'Hired':
        return `Congratulations! You are Hired on the job ${job.jobRole} at ${job.companyName}`
      case 'Shortlisted':
        return `You are Shortlisted for the job ${job.jobRole} at ${job.companyName}`
      case 'Declined':
        return `Unfortunately, your application for the job ${job.jobRole} at ${job.companyName} has been Declined`
      default:
        return ''
    }
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="secondary">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Notifications</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                You have {totalUnRead} unread notifications
              </Typography>
            </Box>

            {totalUnRead > 0 && (
              <Tooltip title="Mark all as read">
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <Iconify icon="eva:done-all-fill" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
            <List disablePadding>
              {newJobDetails.map((job) => (
                <ListItemButton>
                  <ListItemAvatar>
                    <img
                      src={job.profileUrl}
                      className="w-20 h-20 rounded mb-2"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={job.companyName}
                    secondary={getNotificationMessage(job)}
                  />
                </ListItemButton>
              ))}
            </List>
          </Scrollbar>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple>
              View All
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

NotificationsPopover.propTypes = {
  newJobDetails: PropTypes.array.isRequired,
}

export default NotificationsPopover
