import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Typography, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Schedule() {
  const calendarStyles = `
    .fc-theme-standard .fc-toolbar-chunk button {
      background-color: #22C55E !important; 
      color: #ffffff !important; 
      border-color: #008000 !important;
    }

    .fc-theme-standard .fc-toolbar-chunk button:hover,
    .fc-theme-standard .fc-toolbar-chunk button:active {
      background-color: #006400 !important; /* Dark green on hover/active */
      border-color: #006400 !important; /* Dark green border on hover/active */
    }
    .fc-theme-standard .fc-toolbar-chunk button:hover {
      background-color: #006400 !important; 
      border-color: #006400 !important; 
    }

    .fc-theme-standard .fc-toolbar-chunk button:active {
      background-color: #006400 !important;
      border-color: #008000 !important; 
    }
  `;

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [openEventDetailsModal, setOpenEventDetailsModal] = useState(false);
  const [openEditEventModal, setOpenEditEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setTitle("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setOpenAddEventModal(true);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    setOpenEventDetailsModal(true);
  };  

  const handleEditEventClick = () => {
    // Populate the state with the details of the selected event
    setTitle(selectedEvent.title || "");
    setLocation(selectedEvent.extendedProps.location || "");
    setDescription(selectedEvent.extendedProps.description || "");
  
    // Convert start and end time to string in format "HH:MM"
    const startTimeString = selectedEvent.start ? selectedEvent.start.toTimeString().slice(0, 5) : "";
    const endTimeString = selectedEvent.end ? selectedEvent.end.toTimeString().slice(0, 5) : "";
  
    // Set the start and end time in the state
    setStartTime(startTimeString);
    setEndTime(endTimeString);
  
    // Open the edit event modal
    setOpenEditEventModal(true);
  };

  const handleEventSave = () => {
    const newEvent = {
      title: title,
      location: location,
      start: new Date(selectedDate.setHours(startTime.split(':')[0], startTime.split(':')[1])),
      end: new Date(selectedDate.setHours(endTime.split(':')[0], endTime.split(':')[1])),
      description: description,
      allDay: false
    };
  
    setEvents([...events, newEvent]);
    setOpenAddEventModal(false);
  };

  const handleEventEditSave = () => {
    // Update the selected event with the new details
    const updatedSelectedEvent = {
      ...selectedEvent,
      title: title,
      extendedProps: {
        ...selectedEvent.extendedProps,
        location: location,
        description: description,
      },
      start: new Date(selectedDate.setHours(startTime.split(":")[0], startTime.split(":")[1])),
      end: new Date(selectedDate.setHours(endTime.split(":")[0], endTime.split(":")[1])),
    };
  
    // Update the selected event state
    setSelectedEvent(updatedSelectedEvent);
  
    // Update the events state with the modified event object
    const updatedEvents = events.map((event) => {
      if (event === selectedEvent) {
        return updatedSelectedEvent; // Replace the old event with the updated one
      }
      return event;
    });
  
    // Update the events state
    setEvents(updatedEvents);
  
    // Close the edit event modal
    setOpenEditEventModal(false);
  };
   
  const handleEventCancel = () => {
    setOpenAddEventModal(false);
    setOpenEventDetailsModal(false);
    setOpenEditEventModal(false);
  };

  const handleDeleteEvent = () => {
    setOpenConfirmationDialog(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedEvents = events.filter(event => event.title !== selectedEvent.title);
    setEvents(updatedEvents);
    setOpenEventDetailsModal(false);
    setOpenConfirmationDialog(false);
  };

  const handleDeleteCancelled = () => {
    setOpenConfirmationDialog(false);
  };

  return (
    <div>
      <style>{calendarStyles}</style>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay"
      }}
      height="90vh"
      themeSystem="standard"
      events={events} // Pass the updated events array
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
      <Modal open={openAddEventModal} onClose={handleEventCancel}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: "25px", fontSize: "30px", fontWeight: "bold" }}>
            Add Event
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4} 
            style={{ marginBottom: 10 }}
          />
          <div style={{ display: 'flex', marginBottom: 10 }}>
            <TextField
              label="Start Time"
              variant="outlined"
              type="time"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="End Time"
              variant="outlined"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <Button onClick={handleEventSave} variant="contained" color="primary" style={{ backgroundColor: '#16A34A' }}>
              Save
            </Button>
            <Button onClick={handleEventCancel} variant="contained" color="secondary" style={{ marginLeft: 10, backgroundColor:'#EF4444'}}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={openEventDetailsModal} onClose={handleEventCancel}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, minWidth: 400 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px', marginBottom: '5px' }}>
            <button
              onClick={handleEventCancel}
              className="text-gray-700 ml-2 rounded-md hover:text-green-700"
            >
              <CloseOutlinedIcon fontSize="medium"/>
            </button>
          </div>
          <Typography variant="h6" gutterBottom style={{ marginBottom: "25px", paddingLeft: "10px", fontSize: "30px", fontWeight: "bold", backgroundColor: '#4ADE80', borderLeft: '10px solid #166534', borderRadius: '10px' }}>
            {selectedEvent ? selectedEvent.title : "Event Details"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <PlaceOutlinedIcon fontSize="medium" style={{ color: '#14532d', marginRight: 5 }} />
            {selectedEvent ? `Location: ${selectedEvent.extendedProps.location}` : ""}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <AccessTimeRoundedIcon fontSize="medium" style={{ color: '#14532d', marginRight: 5 }} />
            {selectedEvent ? `Start Time: ${selectedEvent.start}` : ""}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <AccessTimeRoundedIcon fontSize="medium" style={{ color: '#14532d', marginRight: 5 }} />
            {selectedEvent ? `End Time: ${selectedEvent.end}` : ""}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedEvent && selectedEvent.extendedProps && selectedEvent.extendedProps.description ? `Description: ${selectedEvent.extendedProps.description}` : ""}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button
              onClick={handleEditEventClick}
              className="text-white font-medium ml-2 rounded-md bg-green-500 px-4 py-2 hover:bg-green-700"
            >
              <ModeEditOutlinedIcon />Edit
            </button>
            <button
              onClick={handleDeleteEvent}
              className="text-white font-medium ml-2 rounded-md bg-red-500 px-4 py-2 hover:bg-red-700"
            >
              <DeleteOutlineOutlinedIcon />Delete
            </button>
          </div>
        </Box>
      </Modal>
      <Modal open={openEditEventModal} onClose={handleEventCancel}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: "25px", fontSize: "30px", fontWeight: "bold" }}>
            Edit Event
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4} 
            style={{ marginBottom: 10 }}
          />
          <div style={{ display: 'flex', marginBottom: 10 }}>
            <TextField
              label="Start Time"
              variant="outlined"
              type="time"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="End Time"
              variant="outlined"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <Button onClick={handleEventEditSave} variant="contained" color="primary" style={{ backgroundColor: '#16A34A' }}>
              Update
            </Button>
            <Button onClick={handleEventCancel} variant="contained" color="secondary" style={{ marginLeft: 10, backgroundColor:'#EF4444'}}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      <Dialog
        open={openConfirmationDialog}
        onClose={handleDeleteCancelled}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmed} color="primary" style={{ backgroundColor: '#16A34A', color:'#ffffff' }}>
            Yes
          </Button>
          <Button onClick={handleDeleteCancelled} color="primary" style={{ marginLeft: 10, backgroundColor:'#EF4444', color:'#ffffff'}}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}