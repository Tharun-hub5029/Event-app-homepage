import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiList, FiUsers, FiClipboard, FiMessageSquare, FiFileText, FiActivity, FiVideo } from "react-icons/fi";

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("project-list");
  const [selectedProject, setSelectedProject] = useState(null);

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
          <SidebarButton active={activeTab === "project-list"} onClick={() => { setActiveTab("project-list"); setSelectedProject(null); }} icon={<FiList />} label="Project List" />
          <SidebarButton active={activeTab === "my-projects"} onClick={() => setActiveTab("my-projects")} icon={<FiUsers />} label="My Projects" />
          <SidebarButton active={activeTab === "tasks"} onClick={() => setActiveTab("tasks")} icon={<FiClipboard />} label="Tasks & Progress" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
        {selectedProject ? (
          <ProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />
        ) : (
          <>
            {activeTab === "project-list" && <ProjectList onSelectProject={setSelectedProject} />}
            {activeTab === "my-projects" && <MyProjects />}
            {activeTab === "tasks" && <Tasks />}
          </>
        )}
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

/* Project List with Grid View */
const ProjectList = ({ onSelectProject }) => {
  const projects = [
    { id: 1, name: "AI Model Deployment", status: "In Progress", img: "https://source.unsplash.com/random/300x200?ai" },
    { id: 2, name: "E-commerce App", status: "Completed", img: "https://source.unsplash.com/random/300x200?ecommerce" },
    { id: 3, name: "Cybersecurity Dashboard", status: "Ongoing", img: "https://source.unsplash.com/random/300x200?cybersecurity" },
    { id: 4, name: "HealthTech Innovation", status: "Planning", img: "https://source.unsplash.com/random/300x200?health" }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Project List</h2>

      {/* Search Bar */}
      <input type="text" placeholder="Search for projects..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img src={project.img} alt={project.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-600">Status: {project.status}</p>
              <button onClick={() => onSelectProject(project)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* My Projects */
const MyProjects = () => <h2 className="text-xl font-bold">My Active Projects</h2>;

/* Tasks & Progress */
const Tasks = () => <h2 className="text-xl font-bold">Tasks & Progress Tracker</h2>;

/* Project Details with Collaboration */
const ProjectDetails = ({ project, onBack }) => {
  const [activeSection, setActiveSection] = useState("chat");

  return (
    <div className="flex h-full">
      {/* Project Info */}
      <div className="w-2/3 p-4">
        <button onClick={onBack} className="text-blue-600 mb-4 flex items-center">
          <FiArrowLeft size={20} className="mr-2" /> Back to Projects
        </button>
        <h2 className="text-xl font-bold mb-4">{project.name}</h2>
        <p className="text-gray-700">Project details and description go here.</p>
      </div>

      {/* Collaboration Panel (Fixed Height & Scrollable) */}
      <aside className="w-1/3 bg-gray-100 p-4 rounded-lg ml-4 flex flex-col">
        <h3 className="font-semibold">Collaboration</h3>
        <nav className="flex space-x-4 my-2">
          <CollabButton active={activeSection === "chat"} onClick={() => setActiveSection("chat")} icon={<FiMessageSquare />} label="Chat" />
          <CollabButton active={activeSection === "documents"} onClick={() => setActiveSection("documents")} icon={<FiFileText />} label="Documents" />
          <CollabButton active={activeSection === "updates"} onClick={() => setActiveSection("updates")} icon={<FiActivity />} label="Updates" />
          <CollabButton active={activeSection === "meetings"} onClick={() => setActiveSection("meetings")} icon={<FiVideo />} label="Meetings" />
        </nav>

        {/* Scrollable Collaboration Section */}
        <div className="p-3 bg-white rounded-lg shadow h-[400px] overflow-y-auto">
          {activeSection === "chat" && <p>Project Chat goes here...</p>}
          {activeSection === "documents" && <p>Document Sharing goes here...</p>}
          {activeSection === "updates" && <p>Live Updates go here...</p>}
          {activeSection === "meetings" && <p>Meeting details go here...</p>}
        </div>
      </aside>
    </div>
  );
};

/* Collaboration Button */
const CollabButton = ({ active, onClick, icon, label }) => (
    <button
    onClick={onClick}
    className={`w-full md:w-auto flex items-center space-x-2 p-2 rounded-md transition ${
      active ? "bg-blue-500 text-white" : "hover:bg-gray-200"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default ProjectDashboard;
