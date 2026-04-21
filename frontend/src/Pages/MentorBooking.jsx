import React, { useState } from "react";
import { FaCalendarAlt, FaSearch, FaComments, FaHistory, FaChalkboardTeacher, FaStar, FaUserCircle, FaArrowLeft } from "react-icons/fa";

const MentorBookingPage = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderContent = () => {
    switch (selectedTab) {
      case "findMentor":
        return <FindMentor />;
      case "myBookings":
        return <MyBookings />;
      case "liveChat":
        return <LiveChat />;
      case "sessionHistory":
        return <SessionHistory />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5">
        
        <button onClick={() => window.location.href = "/userdashboard"} className="mb-4 flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        <h2 className="text-xl font-bold mb-6">Mentor Booking</h2>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("dashboard")}>
          <FaChalkboardTeacher className="mr-2" /> Dashboard Overview
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("findMentor")}>
          <FaSearch className="mr-2" /> Find a Mentor
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("myBookings")}>
          <FaCalendarAlt className="mr-2" /> My Bookings
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("liveChat")}>
          <FaComments className="mr-2" /> Live Chat
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("sessionHistory")}>
          <FaHistory className="mr-2" /> Session History & Reviews
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-5">{renderContent()}</div>
    </div>
  );
};

const DashboardOverview = () => <div>📊 Welcome to the Mentor Booking Dashboard</div>;
const FindMentor = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Find a Mentor</h2>
    <div className="border p-4 rounded-lg flex items-center">
      <FaUserCircle className="text-3xl mr-4" />
      <div>
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p>Expert in Web Development</p>
        <div className="flex items-center">
          <FaStar className="text-yellow-500" /> 4.8
        </div>
      </div>
    </div>
  </div>
);
const MyBookings = () => <div>📅 My Bookings</div>;
const LiveChat = () => <div>💬 Live Chat with Mentors</div>;
const SessionHistory = () => <div>⭐ Previous Sessions & Reviews</div>;

export default MentorBookingPage;
