import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiList, FiUsers, FiUpload, FiActivity, FiAward } from "react-icons/fi";

const HackathonPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hackathon-listing");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => navigate("/userdashboard")}
          className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Sidebar Navigation */}
        <nav className="mt-6 space-y-4">
          <SidebarButton active={activeTab === "hackathon-listing"} onClick={() => setActiveTab("hackathon-listing")} icon={<FiList />} label="Hackathon Listing" />
          <SidebarButton active={activeTab === "my-hackathons"} onClick={() => setActiveTab("my-hackathons")} icon={<FiUsers />} label="My Hackathons" />
          <SidebarButton active={activeTab === "teams"} onClick={() => setActiveTab("teams")} icon={<FiUsers />} label="Teams" />
          <SidebarButton active={activeTab === "submission-portal"} onClick={() => setActiveTab("submission-portal")} icon={<FiUpload />} label="Project Submission" />
          <SidebarButton active={activeTab === "live-dashboard"} onClick={() => setActiveTab("live-dashboard")} icon={<FiActivity />} label="Live Dashboard" />
          <SidebarButton active={activeTab === "post-hackathon"} onClick={() => setActiveTab("post-hackathon")} icon={<FiAward />} label="Post Hackathon" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
        {activeTab === "hackathon-listing" && <HackathonListing />}
        {activeTab === "my-hackathons" && <MyHackathons />}
        {activeTab === "teams" && <Teams />}
        {activeTab === "submission-portal" && <ProjectSubmission />}
        {activeTab === "live-dashboard" && <LiveDashboard />}
        {activeTab === "post-hackathon" && <PostHackathon />}
      </main>
    </div>
  );
};

/* Sidebar Button Component */
const SidebarButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-md transition duration-200 ${
      active ? "bg-blue-600" : "hover:bg-gray-700"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

/* Hackathon Listing with Grid View */
const HackathonListing = () => {
  const hackathons = [
    { name: "AI Innovation Challenge", date: "April 20, 2025", location: "Online", img: "https://source.unsplash.com/random/300x200?tech" },
    { name: "Cybersecurity Hack", date: "May 5, 2025", location: "New York", img: "https://source.unsplash.com/random/300x200?cybersecurity" },
    { name: "Blockchain Development", date: "June 10, 2025", location: "San Francisco", img: "https://source.unsplash.com/random/300x200?blockchain" },
    { name: "Startup Pitch Hack", date: "July 15, 2025", location: "Remote", img: "https://source.unsplash.com/random/300x200?startup" }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upcoming Hackathons</h2>

      {/* Search Bar */}
      <input type="text" placeholder="Search for hackathons..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      {/* Hackathon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {hackathons.map((hack, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img src={hack.img} alt={hack.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{hack.name}</h3>
              <p className="text-sm text-gray-600">{hack.date} • {hack.location}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* My Hackathons */
const MyHackathons = () => <h2 className="text-xl font-bold">My Registered Hackathons</h2>;

/* Teams Section */
const Teams = () => <h2 className="text-xl font-bold">Manage Your Teams</h2>;

/* Project Submission */
const ProjectSubmission = () => <h2 className="text-xl font-bold">Submit Your Project</h2>;

/* Live Dashboard */
const LiveDashboard = () => (
  <div className="flex">
    <div className="w-2/3">
      <h2 className="text-xl font-bold mb-4">Live Announcements</h2>
      <p>Hackathon updates and important messages appear here.</p>
    </div>
    <aside className="w-1/3 bg-gray-100 p-4 rounded-lg ml-4">
      <h3 className="font-semibold">Right-Side Panel</h3>
      <ul className="space-y-3 mt-2">
        <li>📢 Announcements</li>
        <li>❓ Help Desk</li>
        <li>📊 Project Progress Tracker</li>
        <li>🏆 Live Ranking</li>
      </ul>
    </aside>
  </div>
);

/* Post Hackathon */
const PostHackathon = () => (
  <div className="flex">
    <div className="w-2/3">
      <h2 className="text-xl font-bold mb-4">Winner Showcase</h2>
      <p>Top projects and winners will be displayed here.</p>
    </div>
    <aside className="w-1/3 bg-gray-100 p-4 rounded-lg ml-4">
      <h3 className="font-semibold">Right-Side Panel</h3>
      <ul className="space-y-3 mt-2">
        <li>🏆 Winner Showcase</li>
        <li>🎖️ Certificates & Badges</li>
        <li>📜 Report & Summary</li>
      </ul>
    </aside>
  </div>
);

export default HackathonPage;
