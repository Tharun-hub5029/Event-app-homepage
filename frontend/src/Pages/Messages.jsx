import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPaperclip, FiSend, FiMoreVertical, FiArrowLeft } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";

const mockChats = [
  { id: 1, name: "John Doe", lastMessage: "Hey! How’s it going?", unread: 2, type: "dm" },
  { id: 2, name: "AI Study Group", lastMessage: "New study session at 5PM!", unread: 0, type: "group" },
  { id: 3, name: "Jane Smith", lastMessage: "Let's review notes later.", unread: 1, type: "dm" },
];

const MessagesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState([
    { sender: "John Doe", text: "Hey! How’s it going?", time: "10:30 AM" },
    { sender: "Me", text: "Doing great! What about you?", time: "10:32 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages([...messages, { sender: "Me", text: newMessage, time: timestamp }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Chats List */}
      <aside className="w-72 bg-gray-900 text-white p-4 flex flex-col">
        <button
          onClick={() => navigate("/userdashboard")}
          className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition mb-4"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center bg-gray-700 p-2 rounded-md mb-4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white px-2 w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h2 className="text-lg font-bold mb-2">Chats</h2>
        <div className="flex-1 overflow-y-auto">
          {mockChats
            .filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase()))
            .map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                  activeChat.id === chat.id ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveChat(chat)}
              >
                <span>{chat.name}</span>
                {chat.unread > 0 && (
                  <span className="bg-red-500 text-xs px-2 py-1 rounded-full">{chat.unread}</span>
                )}
              </div>
            ))}
        </div>
      </aside>

      {/* Main Chat Window */}
      <main className="flex-1 flex flex-col bg-white shadow-md p-6">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">{activeChat.name}</h2>
          <FiMoreVertical className="cursor-pointer" />
        </div>
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-md p-3 rounded-lg ${
                msg.sender === "Me"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p className="text-sm font-semibold">{msg.sender}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-gray-600 mt-1">{msg.time}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center border-t pt-2">
          <FaRegSmile className="text-gray-500 cursor-pointer mx-2" />
          <FiPaperclip className="text-gray-500 cursor-pointer mx-2" />
          <input
            type="text"
            className="flex-1 border rounded-md p-2 outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            <FiSend />
          </button>
        </div>
      </main>

      {/* Right Panel - User/Group Info */}
      <aside className="w-72 p-4 bg-gray-200 border-l">
        <h2 className="text-lg font-bold mb-2">{activeChat.name} Info</h2>
        {activeChat.type === "dm" ? (
          <p className="text-sm">Bio: Enthusiastic learner & developer.</p>
        ) : (
          <>
            <h3 className="font-bold">Group Members</h3>
            <ul className="list-disc pl-4">
              <li>John Doe</li>
              <li>Jane Smith</li>
              <li>Michael Lee</li>
            </ul>
          </>
        )}
      </aside>
    </div>
  );
};

export default MessagesPage;
