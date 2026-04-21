import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUserPlus, FiUsers, FiUserCheck } from "react-icons/fi";
import api from "../config/api";
import { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest } from "../Services/ConnectionServices";

const NetworkPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending-requests");
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const token = localStorage.getItem("_key_");
  const currentUser = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    api.get(`/api/users/all-users/${currentUser.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    api.get(`/api/connections/pending/${currentUser.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => setPendingRequests(data))
      .catch((error) => console.error("Error fetching pending requests:", error));

    api.get(`/api/connections/my-connections/${currentUser.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => setConnections(data))
      .catch((error) => console.error("Error fetching connections:", error));
  }, [currentUser.id, token]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <button onClick={() => navigate("/userdashboard")} className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition">
          <FiArrowLeft size={20} /> <span>Back to Dashboard</span>
        </button>
        <nav className="mt-6 space-y-4">
          <SidebarButton active={activeTab === "pending-requests"} onClick={() => setActiveTab("pending-requests")} icon={<FiUserPlus />} label="Pending Requests" />
          <SidebarButton active={activeTab === "my-connections"} onClick={() => setActiveTab("my-connections")} icon={<FiUserCheck />} label="My Connections" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
        {activeTab === "pending-requests" && <PendingRequests requests={pendingRequests} setPendingRequests={setPendingRequests} />}
        {activeTab === "my-connections" && <UserList users={connections} title="My Connections" />}
        <UserList users={users} title="Recommendations" />
        <UserList users={users} title="Most Active Users" />
      </main>

      {/* Right Sidebar */}
      <aside className="w-72 p-4 bg-gray-200 border-l">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <p>• John Doe joined AI Club</p>
        <p>• Alice posted about a new project</p>

        <h2 className="text-lg font-bold mt-6 mb-4">University-Based Clubs</h2>
        <p>• Data Science Club</p>
        <p>• Hackathon Enthusiasts</p>
      </aside>
    </div>
  );
};

const SidebarButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center space-x-3 p-3 rounded-md transition duration-200 ${active ? "bg-blue-600" : "hover:bg-gray-700"}`}>
    {icon} <span>{label}</span>
  </button>
);

const PendingRequests = ({ requests, setPendingRequests }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Pending Connection Requests</h2>
    {requests.length === 0 ? (
      <p>No pending requests.</p>
    ) : (
      requests.map((request) => (
        <div key={request.id} className="flex items-center bg-gray-200 p-3 rounded-lg shadow-md mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{request.senderName}</h3>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" onClick={() => acceptConnectionRequest(request.id, setPendingRequests)}>Accept</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition ml-2" onClick={() => rejectConnectionRequest(request.id, setPendingRequests)}>Reject</button>
        </div>
      ))
    )}
  </div>
);

const UserList = ({ users, title }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {users.length === 0 ? (
      <p>No users found.</p>
    ) : (
      users.map((user) => (
        <div key={user.id} className="flex items-center bg-gray-200 p-3 rounded-lg shadow-md mb-2">
          <img src={user.profile_pic || "default-avatar.png"} alt={user.full_name} className="w-12 h-12 rounded-full mr-3" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{user.full_name}</h3>
            <p className="text-sm text-gray-600">{user.university_email}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => sendConnectionRequest(currentUser.id, user.id)}>Connect</button>
        </div>
      ))
    )}
  </div>
);

export default NetworkPage;
