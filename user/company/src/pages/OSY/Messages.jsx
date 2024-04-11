import React, { useState } from 'react'; // Ensure React is imported only once

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Avatar } from '@material-tailwind/react';
import { TextField } from '@mui/material';
import { CONTACTS } from '../../components/lib/consts/dummy/dummy';
import { BiDotsVertical } from 'react-icons/bi';
import { AiOutlinePushpin, AiOutlineStar } from 'react-icons/ai';

export default function Messages() {
  const [activeContact, setActiveContact] = useState(null);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  return (
    <div className="flex flex-col p-3 gap-5">
      <span className="text-3xl font-black">Messages</span>

      <div className="flex flex-row gap-3 h-screen">
        <div className="flex flex-col overflow-auto w-72 p-3">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            className="sticky top-0 "
          />
          <div className="py-3">
            {CONTACTS.map((item) => (
              <Contact
                key={item.id}
                contact={item}
                isActive={activeContact === item}
                onClick={() => handleContactClick(item)}
              ></Contact>
            ))}
          </div>
        </div>
        <div className="flex-1 p-3">
          <MessageContent contact={activeContact} />
        </div>
      </div>
    </div>
  );
}

function Contact({ contact, isActive, onClick }) {
  return (
    <div
      className={`flex flex-row justify-start py-3 gap-3 border-b border-gray-50 ${
        isActive ? 'bg-light-green' : ''
      }`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Avatar src={contact.profile} alt="avatar" />

      <div className="flex flex-wrap justify-between items-center px-1">
        <span className="font-bold">{contact.name}</span>
        <span className="text-xs text-gray-50">{contact.last_sent} mins</span>

        <div className="flex flex-1">
          <span className="text-s overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[11rem] text-gray-50">
            {contact.message_content}
          </span>
        </div>
      </div>
    </div>
  );
}

function MessageContent({ contact }) {
  const [message, setMessage] = useState('');

  return (
    <div className="">
      {contact ? (
        <>
          {/* Contact details display */}
          <div className="chat">
            <ReactQuill
              theme="snow"
              value={message}
              onChange={setMessage}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-gray-50">Select a contact to view messages.</span>
        </div>
      )}
    </div>
  );
}
