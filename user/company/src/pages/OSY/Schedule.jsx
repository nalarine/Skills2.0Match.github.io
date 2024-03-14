import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { useState } from "react";
dayjs.extend(objectSupport);

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    location: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exampleEvents, setExampleEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event for viewing details
  const [editingEvent, setEditingEvent] = useState(null); // State to store the event being edited
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [filterByMonth, setFilterByMonth] = useState(false);
  const [filterByWeek, setFilterByWeek] = useState(false);
  const [filterByDay, setFilterByDay] = useState(false);

  const handleFilterByMonth = () => {
    setFilterByMonth(!filterByMonth);
    setFilterByWeek(false);
    setFilterByDay(false);
  };

  const handleFilterByWeek = () => {
    setFilterByWeek(!filterByWeek);
    setFilterByMonth(false);
    setFilterByDay(false);
  };

  const handleFilterByDay = () => {
    setFilterByDay(!filterByDay);
    setFilterByMonth(false);
    setFilterByWeek(false);
  };

  // Function to handle clicking on a day
  const handleDayClick = (date) => {
    setSelectedDate(date.toString());
    setIsModalOpen(true);
    setEditingEvent(null); // Reset editingEvent state when adding a new event
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEditingEvent(null);
  };

  // Function to handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Here, you can handle submitting event details
    console.log("Event details:", eventDetails);
  
    // Check if there's a title for the event, assuming it's required for submission
    if (!eventDetails.title) {
      // Alert the user to fill in the title field
      alert("Please enter a title for the event.");
      return; // Exit the function without closing the modal
    }
  
    // If editing an existing event
    if (editingEvent) {
      // Update the exampleEvents object with the edited event details
      const updatedEvents = {
        ...exampleEvents,
        [selectedDate]: exampleEvents[selectedDate].map((event) =>
          event === editingEvent ? { ...eventDetails } : event
        ),
      };
  
      // Set the updated events to the state
      setExampleEvents(updatedEvents);
    } else {
      // Adding a new event
      // Update the exampleEvents object with the new event details
      const updatedEvents = {
        ...exampleEvents,
        [selectedDate]: [
          ...(exampleEvents[selectedDate] || []),
          { ...eventDetails }, // Store a copy of eventDetails
        ],
      };
  
      // Set the updated events to the state
      setExampleEvents(updatedEvents);
    }
  
    // Reset eventDetails to clear the form fields
    setEventDetails({
      title: "",
      location: "",
      description: "",
      startTime: "",
      endTime: "",
    });
  
    handleCloseModal(); // Close the modal after submitting
  };

  // Function to handle click on event for displaying details
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setEditingEvent(null); // Reset editingEvent state when viewing event details
  };

  // Function to handle editing event
  const handleEditEvent = (event) => {
    setSelectedEvent(null); // Close the event details modal
    setEditingEvent(event); // Set the event to be edited
    setEventDetails(event); // Populate the form fields with event details for editing
    setIsModalOpen(false); // Open the modal for editing
  };

   // Function to open the delete confirmation modal
  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  // Function to handle delete event
  const handleDeleteEvent = () => {
    // Open the delete confirmation modal
    openDeleteConfirmation();
  };

  // Function to handle confirmed delete event
  const handleConfirmDeleteEvent = () => {
    // Close the delete confirmation modal
    closeDeleteConfirmation();

    // Create a copy of the exampleEvents object
    const updatedEvents = { ...exampleEvents };

    // Find the index of the selected event in the events array
    const eventIndex = updatedEvents[selectedDate].findIndex(
      (event) => event === selectedEvent
    );

    // Remove the selected event from the events array
    updatedEvents[selectedDate].splice(eventIndex, 1);

    // Set the updated events to the state
    setExampleEvents(updatedEvents);

    // Close the modal after deleting the event
    handleCloseModal();
  };

  const [month, setMonth] = useState(dayjs());

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const firstDayOfMonth = month.startOf("month").day();

    // Properties that you might need.
    const isPreviousMonth = i < firstDayOfMonth;
    const isCurrentMonth =
      i >= firstDayOfMonth && i < month.daysInMonth() + firstDayOfMonth;
    const isNextMonth = !isPreviousMonth && !isCurrentMonth;

    // The dayjs object returns information about the current day. Learn more here: https://day.js.org
    let dayjsObject;
    if (isPreviousMonth) {
      dayjsObject = month.startOf("month").subtract(firstDayOfMonth - i, "day");
    } else {
      dayjsObject = month.startOf("month").add(i - firstDayOfMonth, "day");
    }

    const isToday = dayjsObject.isSame(dayjs(), "day");

    // The number and string (YYYY-MM-DD) representations of the day. You can use this to query events for the day.
    const number = dayjsObject.date();
    const string = dayjsObject.format("YYYY-MM-DD");

    // The eventsForTheDay for the day. Use custom logic to fetch eventsForTheDay here. Remember to return an empty array if there are no eventsForTheDay.
    const events = exampleEvents[dayjsObject.format("YYYY-MM-DD")] || [];

    return {
      key: i,
      number,
      string,
      events,
      isToday,
      isPreviousMonth,
      isCurrentMonth,
      isNextMonth,
    };
  });

  const calendarWeeks = Array.from({ length: 6 }, (_, i) =>
    calendarDays.slice(i * 7, i * 7 + 7)
  );

  const renderActions = () => (
    <div className="grid items-center">
{/* Month display and filter buttons */}
<div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setMonth(month.subtract(1, "month"))}
            className="rounded-l-lg border px-2 py-1 hover:bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 6l-6 6l6 6"></path>
            </svg>
          </button>
          <button
            onClick={() => setMonth(month.add(1, "month"))}
            className="ml-[-1px] rounded-r-lg border px-2 py-1 hover:bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </button>

          <button
            onClick={() => setMonth(dayjs())}
            className="ml-4 rounded-lg border px-3 py-1 font-semibold  hover:bg-green-100"
          >
            Today
          </button>
        </div>
        <div className="pointer-events-none text-lg">
          {month.format("MMMM YYYY")}
        </div>
        <div>
          <button
            onClick={handleFilterByMonth}
            className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md ${filterByMonth ? 'bg-green-300' : ''}`}
          >
            Month
          </button>
          <button
            onClick={handleFilterByWeek}
            className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md ${filterByWeek ? 'bg-green-300' : ''}`}
          >
            Week
          </button>
          <button
            onClick={handleFilterByDay}
            className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md ${filterByDay ? 'bg-green-300' : ''}`}
          >
            Day
          </button>
        </div>
    </div>
    </div>
  );

  const renderHeaders = () => (
    <thead className="table-header-group">
      <tr className="table-row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <th key={day} className="table-cell border-x py-1.5 font-medium">
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderEventsByDay = (events) => {
    if (!events.length) return null;
  
    // Limit the number of events to be displayed (suggested 2 for UI uniformity). You can change this to whatever you want.
    const displayLimit = 2;
    if (events.length > displayLimit)
      events = [
        ...events.slice(0, displayLimit),
        `${events.length - displayLimit} more...`,
      ];
  
    return (
      <div className="mt-1 space-y-1 px-0.5 text-sm">
        {events.map((event, key) => (
          <div
            className="line-clamp-1 rounded-sm bg-emerald-500 px-0.5 cursor-pointer"
            key={key}
            onClick={() => handleEventClick(event)} // Add click handler to show event details
          >
            {/* Render event details */}
            <div className="flex justify-between">
              <div>
              <div>{event.startTime}</div>
              </div>
              <div>
                <div className="font-semibold text-base">{event.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };  

  const renderEventDetailsModal = () => {
    if (editingEvent) {
      // Editing an existing event
      return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-1/3">
          <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="text-gray-700 ml-2 mb-4 rounded-md hover:text-green-700"
              >
                <CloseOutlinedIcon fontSize="medium"/>
              </button>
            </div>
            <div className="mb-4">
              <div className="font-medium text-2xl bg-green-200 px-2 py-1 rounded-lg text-left border-4 border-l-8 border-green-200 border-l-green-500">
                Edit Event
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                placeholder="Title"
                className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                placeholder="Location"
                className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={eventDetails.startTime}
                  onChange={handleChange}
                  className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="w-[48%]">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={eventDetails.endTime}
                  onChange={handleChange}
                  className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                placeholder="Description"
                className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900"
              >
                Update
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 ml-2 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    } else if (selectedEvent) {
      // Viewing event details
      return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-1/3">
          <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="text-gray-700 ml-2 mb-4 rounded-md hover:text-green-700"
              >
                <CloseOutlinedIcon fontSize="medium"/>
              </button>
            </div>
            <div className="mb-4">
              <div className="font-medium text-2xl bg-green-200 px-2 py-1 rounded-lg text-left border-4 border-l-8 border-green-200 border-l-green-500">
                {selectedEvent.title}
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <PlaceOutlinedIcon fontSize="medium" style={{ color: '#14532d' }} />
              <div className="pl-2 text-lg">{selectedEvent.location}</div>
              <div className="pl-2 text-lg">
                ({selectedEvent.startTime} - {selectedEvent.endTime})
              </div>
            </div>
            <div>
              <div className="mb-4">
                <div className="font-semibold text-left">Description:</div>
                <div className="text-left pt-2">{selectedEvent.description}</div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-green-300 text-gray-700 ml-2 px-4 py-2 rounded-md"
                  onClick={() => handleEditEvent(selectedEvent)} // Handle edit event
                >
                  <ModeEditOutlinedIcon />Edit
                </button>
                <button
                  className="bg-red-300 text-gray-700 ml-2 px-4 py-2 rounded-md"
                  onClick={handleDeleteEvent}
                >
                  <DeleteOutlineOutlinedIcon />Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const DeleteConfirmationModal = ({ closeDeleteConfirmation }) => {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md w-72">
          <p>Are you sure you want to delete this event?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleConfirmDeleteEvent} // Change this line
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Yes
            </button>
            <button
              onClick={closeDeleteConfirmation}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {renderActions()}
      <table className="mt-3 table w-full table-fixed border-collapse flex-col border">
        {renderHeaders()}
        <tbody className="table-row-group">
          {calendarWeeks.map((week, key) => (
            <tr key={key} className="table-row">
              {week.map((day) => (
                <td
                  onClick={() => handleDayClick(day.string)}
                  key={day.number}
                  className="table-cell cursor-pointer border"
                >
                  <div
                    className={
                      "flex h-28 flex-col p-0.5" +
                      (!day.isCurrentMonth ? " bg-gray-200 opacity-25" : "")
                    }
                  >
                    <div
                      className={
                        "self-end h-7 w-7 flex items-center justify-center" +
                        (day.isToday ? " text-white font-semibold bg-green-700 rounded-lg" : "")
                      }
                    >
                      {day.number}
                    </div>
                    {renderEventsByDay(day.events)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding event */}
      {isModalOpen && !selectedEvent && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-3/5">
            <h2 className="text-lg font-bold mb-4">Add Event</h2>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                placeholder="Title"
                className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                placeholder="Location"
                className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={eventDetails.startTime}
                  onChange={handleChange}
                  className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="w-[48%]">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={eventDetails.endTime}
                  onChange={handleChange}
                  className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                placeholder="Description"
                className="border border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 ml-2 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}	
      {/* Modal for displaying event details */}
      {renderEventDetailsModal()}

      {showDeleteConfirmation && (
        <DeleteConfirmationModal closeDeleteConfirmation={closeDeleteConfirmation} />
      )}
    </div>
  );
}