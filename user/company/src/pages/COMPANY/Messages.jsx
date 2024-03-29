import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button } from '@mui/material'
import { TextField } from '@mui/material'
import { CONTACTS } from '../../components/lib/consts/dummy/dummy'
import { BiDotsVertical } from 'react-icons/bi'
import {
  AiOutlinePushpin,
  AiOutlineStar,
  AiOutlineSend,
  AiOutlinePaperClip,
} from 'react-icons/ai'
import io from 'socket.io-client'

const socket = io('http://localhost:5137') // Change the URL to match your Socket.io server

export default function Messages() {
  const [activeContact, setActiveContact] = useState(null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const chatEndRef = useRef(null)

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setChatHistory((prevChatHistory) => [message, ...prevChatHistory]) // Add new message to the beginning
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContactClick = (contact) => {
    setActiveContact(contact)
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSend = () => {
    if (message.trim() !== '' && activeContact) {
      const newMessage = {
        content: message,
        sender: activeContact.id, // Set sender dynamically based on active contact
      }

      setChatHistory((prevChatHistory) => [newMessage, ...prevChatHistory]) // Add new message to the beginning
      socket.emit('sendMessage', newMessage)

      setMessage('')
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="fixed-background">
      <div className="flex flex-row h-screen">
        {/* Contacts list */}
        <div className="bg-gray-200 w-1/4 p-2">
          {/* Search bar */}
          <div className="fixed top-20 bg-gray-200 z-10 p-5 mt-6 mr-6">
            <span className="text-3xl font-black text-black mb-0">
              Messages
            </span>
            <br />
            <br />
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-5"
            />
          </div>
          {/* Contacts */}
          <div className="overflow-y-auto" style={{ marginTop: '120px' }}>
            {filteredContacts.map((item) => (
              <div
                key={item.id}
                className={`flex items-start p-3 mb-2 rounded-lg cursor-pointer ${
                  activeContact === item
                    ? 'bg-green-500 text-white' // Change here to bg-green-500
                    : 'hover:bg-gray-300'
                }`}
                onClick={() => handleContactClick(item)}
                style={{
                  justifyContent: 'flex-start',
                  paddingLeft: '10px',
                }}
              >
                <Avatar src={item.profile} alt="avatar" />
                <div className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-bold whitespace overflow-hidden overflow-ellipsis">
                      {item.name}
                    </span>
                    <span className="text-xs whitespace overflow-ellipsis max-w-[11rem]">
                      {item.message_content.length > 30
                        ? item.message_content.slice(0, 30) + '...'
                        : item.message_content}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chat area */}
        <div
          className="flex-1 bg-white h-full relative"
          style={{
            position: 'fixed',
            top: 100,
            right: 0,
            bottom: 50,
            left: '41%',
            maxWidth: '75%',
            maxHeight: '87%',
          }}
        >
          <div className="flex flex-col justify-between h-full mt-5">
            {activeContact ? (
              <>
                {/* Header */}
                <div className="flex justify-between items-center bg-white px-4 sticky top-0 z-10">
                  <Avatar src={activeContact.profile} alt="avatar" />
                  <div className="ml-3">
                    <span className="font-bold text-black">
                      {activeContact.name}
                    </span>
                    <br />
                    <span className="text-sm text-black">
                      {activeContact.position}
                    </span>
                    <div className="border-b border-gray-400 w-full mt-2"></div>
                  </div>
                  <div className="flex items-center">
                    <AiOutlinePushpin size="25px" className="text-gray-500" />
                    <AiOutlineStar size="25px" className="text-gray-500" />
                    <BiDotsVertical size="25px" className="text-gray-500" />
                    <span className="font-bold text-green-500">
                      View Profile
                    </span>
                  </div>
                </div>
                {/* Chat messages */}
                <div
                  className="flex-1 overflow-y-auto"
                  style={{
                    marginTop: '2px',
                    marginBottom: '120px',
                    position: 'relative',
                    maxHeight: 'calc(150vh - 220px)', // Adjusted maxHeight to make space for message input
                    overflowX: 'hidden',
                  }}
                >
                  <div className="chat-container flex flex-col-reverse">
                    {' '}
                    {/* Reverse order */}
                    {chatHistory.map((chat, index) => (
                      <div
                        key={index}
                        className={`chat p-3 rounded-lg ${
                          chat.sender === activeContact.id
                            ? 'bg-green-500 text-white self-end'
                            : 'bg-gray-300 text-black self-start'
                        }`}
                        style={{
                          // alignSelf: "flex-start",
                          // marginLeft: "10px",
                          // marginRight: "10px",
                          // textAlign: chat.sender === activeContact.id ? "right" : "left",
                          maxWidth: '70%', // Set maximum width for message content
                          wordWrap: 'break-word', // Ensure long messages wrap properly
                        }}
                      >
                        {chat.content}
                      </div>
                    ))}
                    <div ref={chatEndRef}></div>
                  </div>
                </div>
              </>
            ) : (
              // Placeholder when no contact is selected
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">
                  Select a contact to view messages.
                </span>
              </div>
            )}
          </div>
          {/* Message input */}
          {activeContact && (
            <div
              className="fixed sticky bottom-0 left-0 w-full p-5"
              style={{ marginBottom: '50px' }} // Adjust margin bottom
            >
              <div className="flex items-center">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Type a message"
                  multiline
                  rows={1}
                  value={message}
                  onChange={handleMessageChange}
                  variant="outlined"
                  className="w-full mr-3 rounded-full"
                  InputProps={{
                    classes: { root: 'rounded-full' },
                    onKeyDown: (e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault() // Prevent default behavior of new line on Enter
                        handleSend()
                      }
                    },
                  }}
                />
                <Button onClick={handleSend}>
                  <AiOutlineSend size="25px" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
