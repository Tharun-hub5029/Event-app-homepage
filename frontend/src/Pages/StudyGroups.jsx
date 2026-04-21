import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiVideo, FiUsers, FiAward, FiBook, FiSearch } from "react-icons/fi";
import api from "../config/api";

const StudyGroupsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [studyGroups, setStudyGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Enhanced Mock Data for Study Groups
    const mockGroups = [
      { id: 1, name: "AI & Machine Learning", members: 120, topics: "Deep Learning, NLP", image: "ai.jpg" },
      { id: 2, name: "Data Structures & Algorithms", members: 95, topics: "Sorting, Graphs", image: "dsa.jpg" },
      { id: 3, name: "Cybersecurity Basics", members: 75, topics: "Network Security, Encryption", image: "cyber.jpg" },
      { id: 4, name: "Web Development", members: 130, topics: "React, Node.js", image: "webdev.jpg" },
      { id: 5, name: "Cloud Computing", members: 88, topics: "AWS, Azure", image: "cloud.jpg" },
      { id: 6, name: "Mobile App Development", members: 60, topics: "Flutter, React Native", image: "mobile.jpg" }
    ];
    setStudyGroups(mockGroups);
  }, []);

  const filteredGroups = studyGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <button onClick={() => navigate("/userdashboard")} className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition">
          <FiHome size={20} /> <span>Back to Dashboard</span>
        </button>
        <nav className="mt-6 space-y-4">
          <SidebarButton active={activeTab === "home"} onClick={() => setActiveTab("home")} icon={<FiHome />} label="Home" />
          <SidebarButton active={activeTab === "live"} onClick={() => setActiveTab("live")} icon={<FiVideo />} label="Live Sessions" />
          <SidebarButton active={activeTab === "matching"} onClick={() => setActiveTab("matching")} icon={<FiUsers />} label="Buddy Matching" />
          <SidebarButton active={activeTab === "leaderboard"} onClick={() => setActiveTab("leaderboard")} icon={<FiAward />} label="Leaderboard" />
          <SidebarButton active={activeTab === "resources"} onClick={() => setActiveTab("resources")} icon={<FiBook />} label="Resources" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center mb-4">
          <FiSearch className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search Study Groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {activeTab === "home" && <StudyGroupGrid studyGroups={filteredGroups} />}
        {activeTab === "live" && <h2 className="text-xl font-bold">Live Study Sessions</h2>}
        {activeTab === "matching" && <h2 className="text-xl font-bold">Find Your Study Buddy</h2>}
        {activeTab === "leaderboard" && <h2 className="text-xl font-bold">Study Leaderboard</h2>}
        {activeTab === "resources" && <h2 className="text-xl font-bold">Study Resources</h2>}
      </main>

      {/* Right Sidebar */}
      <aside className="w-72 p-4 bg-gray-200 border-l">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <p>• Emily joined Web Development group</p>
        <p>• John shared a new study resource</p>

        <h2 className="text-lg font-bold mt-6 mb-4">University-Based Study Groups</h2>
        <p>• Physics Study Club</p>
        <p>• AI Research Group</p>
      </aside>
    </div>
  );
};

const SidebarButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center space-x-3 p-3 rounded-md transition duration-200 ${active ? "bg-blue-600" : "hover:bg-gray-700"}`}>
    {icon} <span>{label}</span>
  </button>
);

const StudyGroupGrid = ({ studyGroups }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Join a Study Group</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {studyGroups.map((group) => (
        <div key={group.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center">
          <img src={group.image} alt={group.name} className="w-24 h-24 rounded-full mb-2" />
          <h3 className="text-lg font-semibold text-center">{group.name}</h3>
          <p className="text-sm text-gray-600 text-center">{group.members} members</p>
          <p className="text-xs text-gray-500 text-center">Topics: {group.topics}</p>
          <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700 transition">Join</button>
        </div>
      ))}
    </div>
  </div>
);

export default StudyGroupsPage;
