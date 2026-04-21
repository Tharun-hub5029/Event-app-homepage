import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiList, FiCalendar, FiClock, FiFileText } from "react-icons/fi";

const EventPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("event-listing");

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
          <SidebarButton
            active={activeTab === "event-listing"}
            onClick={() => setActiveTab("event-listing")}
            icon={<FiList />}
            label="Event Listing"
          />
          <SidebarButton
            active={activeTab === "my-events"}
            onClick={() => setActiveTab("my-events")}
            icon={<FiCalendar />}
            label="My Events"
          />
          <SidebarButton
            active={activeTab === "event-reminders"}
            onClick={() => setActiveTab("event-reminders")}
            icon={<FiClock />}
            label="Event Reminders"
          />
          <SidebarButton
            active={activeTab === "post-event-resources"}
            onClick={() => setActiveTab("post-event-resources")}
            icon={<FiFileText />}
            label="Post-Event Resources"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
        {/* Render Content Based on Active Tab */}
        {activeTab === "event-listing" && <EventListing />}
        {activeTab === "my-events" && <MyEvents />}
        {activeTab === "event-reminders" && <EventReminders />}
        {activeTab === "post-event-resources" && <PostEventResources />}
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

/* Event Listing with Grid Layout */
const EventListing = () => {
  const events = [
    { name: "Hackathon 2025", date: "March 25, 2025", location: "Online", img: "https://source.unsplash.com/random/300x200?tech" },
    { name: "AI Workshop", date: "April 10, 2025", location: "New York", img: "https://source.unsplash.com/random/300x200?ai" },
    { name: "Tech Meetup", date: "May 5, 2025", location: "San Francisco", img: "https://source.unsplash.com/random/300x200?conference" },
    { name: "Startup Pitch", date: "June 20, 2025", location: "Remote", img: "https://source.unsplash.com/random/300x200?business" }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for events..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.map((event, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img src={event.img} alt={event.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* My Events Component */
const MyEvents = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">My Registered Events</h2>
    <p className="text-gray-600">You have no upcoming registered events.</p>
  </div>
);

/* Event Reminders Component */
const EventReminders = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Event Reminders</h2>
    <p className="text-gray-600">You have no upcoming reminders.</p>
  </div>
);

/* Post-Event Resources Component */
const PostEventResources = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Post-Event Resources</h2>
    <p className="text-gray-600">Resources will appear here after events.</p>
  </div>
);

export default EventPage;
