import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
  `;

  return (
    <div>
      <style>{calendarStyles}</style>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height={"90vh"}
        themeSystem="standard" // Set theme system to standard
      />
    </div>
  );
}
