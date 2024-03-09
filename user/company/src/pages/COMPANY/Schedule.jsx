import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { useState } from "react";
dayjs.extend(objectSupport);

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
  const [exampleEvents, setExampleEvents] = useState({}); // Define initial state as an empty object
  const [selectedEvent, setSelectedEvent] = useState(null); // New state to track selected event for detail modal

  // Function to handle clicking on a day
  const handleDayClick = (date) => {
    setSelectedDate(date.toString());
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Clear selected event when modal is closed
  };

  // Function to handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle form submission ----------------------------------------------
  const handleSubmit = () => {
    // Here, you can handle submitting event details
    console.log("Event details:", eventDetails);

    // Check if there's a title for the event, assuming it's required for submission
    if (!eventDetails.title) {
      // Alert the user to fill in the title field
      alert("Please enter a title for the event.");
      return; // Exit the function without closing the modal
    }

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
      <div className="col-start-1 row-start-1 flex justify-start">
        <div className="flex">
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
      </div>
      <div className="pointer-events-none col-start-1 row-start-1 flex justify-center text-lg">
        {month.format("MMMM YYYY")}
      </div>
      <div className="pointer-events-none  col-start-1 row-start-1 flex justify-end"></div>
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
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md w-2/3">
          <h2 className="text-lg font-bold mb-4">Event Details</h2>
          <div className="mb-4">
            <div className="font-semibold">Title:</div>
            <div>{selectedEvent.title}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Location:</div>
            <div>{selectedEvent.location}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Start Time:</div>
            <div>{selectedEvent.startTime}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">End Time:</div>
            <div>{selectedEvent.endTime}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Description:</div>
            <div>{selectedEvent.description}</div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseModal}
              className="bg-gray-200 text-gray-700 ml-2 px-4 py-2 rounded-md"
            >
              Close
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
    </div>
  );
}