import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Iconify from '../../pages/admin2/components/iconify/iconify'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import List from '@mui/material/List'
import Scrollbar from '../../pages/admin2/components/scrollbar/scrollbar'
import { useSelector } from 'react-redux'

const NotificationsPopover = ({ newJobDetails }) => {
  if (!newJobDetails) {
    return null // Render nothing if newJobDetails is undefined
  }

  const { user } = useSelector((state) => state.user)

  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem('notifications')
    return storedNotifications ? JSON.parse(storedNotifications) : []
  })

  const [mostRecentUnreadIndex, setMostRecentUnreadIndex] = useState(-1)

  const previousJobDetails = useRef([])

  useEffect(() => {
    const generateNotifications = () => {
      const newNotifications = []

      newJobDetails.forEach((newJob) => {
        const previousJob = previousJobDetails.current.find(
          (job) => job.id === newJob.id,
        )
        if (!previousJob || previousJob.hiringStage !== newJob.hiringStage) {
          const notification = {
            id: `${newJob.id}-${Date.now()}`,
            companyName: newJob.companyName,
            job: newJob,
            isUnread: true, // Initialize notification as unread
          }
          newNotifications.unshift(notification) // Prepend new notification
        }
      })

      setNotifications((prevNotifications) => [
        ...newNotifications,
        ...prevNotifications, // Add previous notifications
      ])
      previousJobDetails.current = newJobDetails

      // Update most recent unread index if new unread notification added
      const newUnreadIndex = newNotifications.findIndex(
        (notification) => notification.isUnread,
      )
      if (newUnreadIndex !== -1) {
        setMostRecentUnreadIndex(newUnreadIndex)
      }
    }

    generateNotifications()
  }, [newJobDetails])

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  const hasNewNotifications = newJobDetails.length > 0

  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAsRead = (index) => {
    // Mark the notification at the specified index as read
    const updatedNotifications = [...notifications]
    updatedNotifications[index] = {
      ...updatedNotifications[index],
      isUnread: false,
    }
    setNotifications(updatedNotifications)

    // Update the most recent unread index if needed
    if (index === mostRecentUnreadIndex) {
      const nextUnreadIndex = updatedNotifications.findIndex(
        (notification) => notification.isUnread,
      )
      setMostRecentUnreadIndex(nextUnreadIndex)
    }
  }

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isUnread: false,
    }))
    setNotifications(updatedNotifications)
    setMostRecentUnreadIndex(-1) // Reset most recent unread index
  }

  const getNotificationMessage = (job) => {
    switch (job.hiringStage) {
      case 'Pending':
        return `Your application for the job ${job.jobRole} at ${job.companyName} is Pending`
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
      <IconButton onClick={handleOpen} className="relative">
        {hasNewNotifications && <div></div>}
        <Badge
          badgeContent={notifications.filter((n) => n.isUnread).length}
          color="secondary"
        >
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
                You have {notifications.filter((n) => n.isUnread).length} unread
                notifications
              </Typography>
            </Box>

            {notifications.filter((n) => n.isUnread).length > 0 && (
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
              {notifications.map((notification, index) => (
                <ListItemButton
                  key={notification.id}
                  className={notification.isUnread ? 'bg-green-100' : ''}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: notification.isUnread
                        ? '#C1E1C1'
                        : 'transparent',
                      padding: '8px', // Adjust padding as needed
                      borderRadius: '4px', // Add some rounded corners
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={user.profileUrl}
                        className="w-20 h-20 rounded mb-2"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={notification.companyName}
                      secondary={getNotificationMessage(notification.job)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '8px', // Adjust spacing between avatar and text
                      }}
                    />
                  </div>
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
