import React, { useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import { TextField, Button } from '@mui/material'
import { AiOutlinePushpin, AiOutlineStar } from 'react-icons/ai'
import { BiDotsVertical } from 'react-icons/bi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import { CONTACTS } from '@/components/lib/consts/dummy/dummy.jsx'

export default function Messages() {
  const [activeContact, setActiveContact] = useState(null)
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [filteredContacts, setFilteredContacts] = useState(CONTACTS)
  const [pinClicked, setPinClicked] = useState(false)
  const [starClicked, setStarClicked] = useState(false)
  const [moreOptionsClicked, setMoreOptionsClicked] = useState(false)
  const [viewProfileClicked, setViewProfileClicked] = useState(false)

  const { user } = useSelector((state) => state.user)

  const handleContactClick = (contact) => {
    setActiveContact(contact)
  }

  const handleMessageChange = (value) => {
    setMessage(value)
  }

  const sendMessage = () => {
    const newMessage = {
      content: message,
      sentAt: new Date(),
      sender: user?.firstName || 'user',
    }

    setConversation([...conversation, newMessage])
    setMessage('')
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    const filtered = CONTACTS.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm),
    )
    setFilteredContacts(filtered)
  }

  return (
    <div className="flex flex-col p-3 gap-5">
      <span className="text-3xl font-black">Messages</span>

      <div className="flex flex-row gap-3 h-screen">
        <div className="flex flex-col overflow-auto w-72 p-3">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            className="sticky top-0"
            onChange={handleSearch}
          />
          <div className="py-3 overflow-auto">
            {filteredContacts.map((item) => (
              <Contact
                key={item.id}
                contact={item}
                isActive={activeContact === item}
                onClick={() => handleContactClick(item)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 p-3 overflow-auto">
          <MessageContent
            contact={activeContact}
            conversation={conversation}
            message={message}
            handleMessageChange={handleMessageChange}
            sendMessage={sendMessage}
            pinClicked={pinClicked}
            starClicked={starClicked}
            moreOptionsClicked={moreOptionsClicked}
            viewProfileClicked={viewProfileClicked}
            setPinClicked={setPinClicked}
            setStarClicked={setStarClicked}
            setMoreOptionsClicked={setMoreOptionsClicked}
            setViewProfileClicked={setViewProfileClicked}
          />
        </div>
      </div>
    </div>
  )
}

function Contact({ contact, isActive, onClick }) {
  return (
    <div
      className={`flex flex-row justify-start py-3 gap-3 border-b border-gray-50 ${
        isActive ? 'bg-light-green border-green-500' : ''
      }`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Avatar src={contact.profile} alt="avatar" />

      <div className="flex flex-wrap justify-between items-center px-1">
        <span className="font-bold">{contact.name}</span>
        <span className="text-xs text-black">{contact.last_sent} mins</span>

        <div className="flex flex-1">
          <span className="text-s overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[11rem] text-black-50">
            {contact.message_content}
          </span>
        </div>
      </div>
    </div>
  )
}

function MessageContent({
  contact,
  conversation,
  message,
  handleMessageChange,
  sendMessage,
  pinClicked,
  starClicked,
  moreOptionsClicked,
  viewProfileClicked,
  setPinClicked,
  setStarClicked,
  setMoreOptionsClicked,
  setViewProfileClicked,
}) {
  const currentUser = useSelector((state) => state.user)

  const handlePinMessage = () => {
    setPinClicked(!pinClicked)
  }

  const handleStarMessage = () => {
    setStarClicked(!starClicked)
  }

  const handleMoreOptions = () => {
    setMoreOptionsClicked(!moreOptionsClicked)
  }

  const handleViewProfile = () => {
    setViewProfileClicked(!viewProfileClicked)
  }

  // Dummy message from the other contact
  const dummyMessage = {
    content: "Hey there! How's it going?",
    sentAt: new Date(),
    sender: contact?.name || 'Other Contact',
  }

  return (
    <div className="">
      {contact ? (
        <>
          <div
            className="flex flex-1 justify-between h-24 border-b"
            style={{ paddingTop: '50px', paddingBottom: '70px' }}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <Avatar src={contact.profile} alt="avatar" size="lg" />
              <div className="flex flex-col justify-center">
                <span className="font-bold">{contact.name}</span>
                <span
                  className="text-sm"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                >
                  {contact.position}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-2 justify-end items-center">
              <AiOutlinePushpin
                size="25px"
                className={pinClicked ? 'text-blue-500' : 'text-black'}
                onClick={handlePinMessage}
              />
              <AiOutlineStar
                size="25px"
                className={starClicked ? 'text-yellow-500' : 'text-black'}
                onClick={handleStarMessage}
              />
              <BiDotsVertical
                size="25px"
                className={moreOptionsClicked ? 'text-green-500' : 'text-black'}
                onClick={handleMoreOptions}
              />
              <span
                className={viewProfileClicked ? 'text-green-500' : 'text-black'}
                onClick={handleViewProfile}
              >
                View Profile
              </span>
            </div>
          </div>

          {/* Dummy message from the company */}
          <div
            className={`flex flex-col ${
              dummyMessage.sender === currentUser.firstName
                ? 'items-start'
                : 'items-end'
            } mb-3`}
          >
            {dummyMessage.sender !== currentUser.firstName && (
              <span className="font-bold self-start">
                {dummyMessage.sender}
              </span>
            )}
            <div
              className={`rounded-lg py-2 px-3 ${
                dummyMessage.sender === currentUser.firstName
                  ? 'bg-gray-100 text-left text-black self-end'
                  : 'bg-gray-100 text-left text-black self-start'
              }`}
            >
              {dummyMessage.content}
            </div>
            <span className="text-xs self-start">
              {formatTime(dummyMessage.sentAt)}
            </span>
          </div>

          {/* Displaying the conversation */}
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.sender === currentUser.firstName
                  ? 'items-start'
                  : 'items-end'
              } mb-3`}
            >
              {msg.sender !== currentUser.firstName && (
                <span className="font-bold">{msg.sender}</span>
              )}
              <div
                className={`rounded-lg py-2 px-3 max-w-80 overflow-clip ${
                  msg.sender === currentUser.firstName
                    ? 'bg-gray-500 text-left text-black self-start'
                    : 'bg-green-500 text-left text-black self-end'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              ></div>
              <span className="text-xs">{formatTime(msg.sentAt)}</span>
            </div>
          ))}

          {/* Message input */}
          <div className="chat-input mt-3">
            <ReactQuill
              theme="snow"
              value={message}
              onChange={handleMessageChange}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-2"
              onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-black">Select a contact to view messages.</span>
        </div>
      )}
    </div>
  )
}

function formatTime(time) {
  const now = new Date()
  const diff = now - time
  const minutes = Math.floor(diff / 60000)
  return `${minutes} mins`
}
