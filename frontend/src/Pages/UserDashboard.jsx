import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white shadow-lg p-5 space-y-6">
        <ul className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Main</h4>
        
          <li><button className="sidebar-btn" onClick={() => navigate("/userdashboard/activity_feed")}>Activity Feed</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/events")}>Events</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/hackathons")}>Hackathons</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/project-Collaboration")}>Project Collaboration</button></li>
        </ul>

        <ul className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Learning & Networking</h4>
          <li><button className="sidebar-btn" onClick={() => navigate("/forums")}>Forums</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/network")}>Network</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/messages")}>Messages</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/study-groups")}>Study Groups</button></li>
        </ul>

        <ul className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Career Development</h4>
          <li><button className="sidebar-btn" onClick={() => navigate("/career_guidance")}>Career Guidance</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/mentor-bookings")}>Mentor Booking</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/internships-jobs")}>Internships & Jobs</button></li>
        </ul>

        <ul className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Personal & Settings</h4>
          <li><button className="sidebar-btn" onClick={() => navigate("/profile")}>Profile</button></li>
          <li><button className="sidebar-btn" onClick={() => navigate("/userdashboard/settings")}>Settings</button></li>
          <li><button className="sidebar-btn text-red-500" onClick={() => navigate("/userdashboard/logout")}>Logout</button></li>
        </ul>
      </nav>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
