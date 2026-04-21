import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const sections = [
  "Personalized Career Recommendations",
  "Industry Insights",
  "Career Roadmaps",
  "Skill Development",
  "Success Stories",
  "Q&A Forum",
  "Resume & LinkedIn Profile Reviews",
  "Career Events & Webinars",
];

const CareerGuidancePage = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const navigate = useNavigate();
  const renderContent = () => {
    switch (activeSection) {
      case "Personalized Career Recommendations":
        return <div>AI-driven suggestions based on skills & interests.</div>;
      case "Industry Insights":
        return <div>Latest trends, salary expectations, required skills.</div>;
      case "Career Roadmaps":
        return <div>Step-by-step guides for different career paths.</div>;
      case "Skill Development":
        return <div>Recommended courses, certifications.</div>;
      case "Success Stories":
        return <div>Inspiring journeys of students/alumni.</div>;
      case "Q&A Forum":
        return <div>Students can ask career-related questions to experts.</div>;
      case "Resume & LinkedIn Profile Reviews":
        return <div>Peer & mentor feedback on resumes and LinkedIn profiles.</div>;
      case "Career Events & Webinars":
        return <div>Upcoming industry talks and workshops.</div>;
      default:
        return <div>Select a section to view details.</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <button
          onClick={() => navigate("/userdashboard")}
          className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h2 className="text-lg font-bold mb-4">Career Guidance</h2>
        <div className="flex-1 overflow-y-auto">
          {sections.map((section) => (
            <div
              key={section}
              className={`p-3 rounded-md mb-2 cursor-pointer ${
                  activeSection === section ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-white shadow-md p-6">
        <h2 className="text-xl font-bold border-b pb-2 mb-4">{activeSection}</h2>
        <div>{renderContent()}</div>
      </main>
    </div>
  );
};

export default CareerGuidancePage;