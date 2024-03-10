import { useState } from "react";

export default function modal ({ isOpen, onRequestClose, selectedDate, onAddEvent, onEditEvent, onDeleteEvent }) {
  const [event, setEvent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (event.trim() !== "") {
      onAddEvent(event);
      setEvent("");
    }
  };

  const handleEdit = () => {
    if (event.trim() !== "") {
      onEditEvent(selectedDate, editIndex, event);
      setEvent("");
      setEditIndex(null);
    }
  };

  const handleDelete = () => {
    onDeleteEvent(selectedDate, editIndex);
    setEvent("");
    setEditIndex(null);
  };

  const handleClose = () => {
    setEvent("");
    setEditIndex(null);
    onRequestClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"} fixed inset-0 bg-gray-700 bg-opacity-50 z-50`}>
      <div className="modal-dialog p-4 bg-white w-96 mx-auto mt-20 rounded-md">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold">Event Details</h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="border rounded-md w-full px-2 py-1 mb-2"
              placeholder="Enter event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
            <div className="flex justify-between">
              {editIndex !== null ? (
                <>
                  <button onClick={handleEdit} className="btn bg-blue-500 text-white hover:bg-blue-600">
                    Update
                  </button>
                  <button onClick={handleDelete} className="btn bg-red-500 text-white hover:bg-red-600">
                    Delete
                  </button>
                </>
              ) : (
                <button onClick={handleAdd} className="btn bg-green-500 text-white hover:bg-green-600">
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}