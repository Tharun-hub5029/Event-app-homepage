import React, { useState } from "react";
import { FaHome, FaSearch, FaSave, FaFileAlt, FaBuilding, FaUserTie, FaCalendarAlt, FaFilePdf, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InternshipsJobsPage = () => {
  const [selectedTab, setSelectedTab] = useState("jobListings");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedTab) {
      case "findJobs":
        return <FindJobs />;
      case "savedJobs":
        return <SavedJobs />;
      case "myApplications":
        return <MyApplications />;
      case "companyProfiles":
        return <CompanyProfiles />;
      case "alumniReferrals":
        return <AlumniReferrals />;
      case "jobFairs":
        return <JobFairs />;
      case "resumeTemplates":
        return <ResumeTemplates />;
      default:
        return <JobListings />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5">
        <button onClick={() => navigate("/userdashboard")} className="mb-4 flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        <h2 className="text-xl font-bold mb-6">Internships & Jobs</h2>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("jobListings")}>
          <FaHome className="mr-2" /> Dashboard Overview
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("findJobs")}>
          <FaSearch className="mr-2" /> Find Jobs & Internships
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("savedJobs")}>
          <FaSave className="mr-2" /> Saved Jobs
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("myApplications")}>
          <FaFileAlt className="mr-2" /> My Applications
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("companyProfiles")}>
          <FaBuilding className="mr-2" /> Company Profiles
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("alumniReferrals")}>
          <FaUserTie className="mr-2" /> Alumni & Referrals
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("jobFairs")}>
          <FaCalendarAlt className="mr-2" /> Job Fairs & Events
        </button>
        <button className="mb-4 flex items-center" onClick={() => setSelectedTab("resumeTemplates")}>
          <FaFilePdf className="mr-2" /> Resume & Templates
        </button>
      </div>
      {/* Main Content */}
      <div className="w-3/4 p-5">{renderContent()}</div>
    </div>
  );
};

const JobListings = () => <div>📌 Explore Job and Internship Listings</div>;
const FindJobs = () => <div>🔍 Find Jobs & Internships</div>;
const SavedJobs = () => <div>💾 Saved Jobs</div>;
const MyApplications = () => <div>📑 Track Your Applications</div>;
const CompanyProfiles = () => <div>🏢 Learn About Employers</div>;
const AlumniReferrals = () => <div>👨‍💼 Connect with Alumni</div>;
const JobFairs = () => <div>📅 Upcoming Job Fairs & Events</div>;
const ResumeTemplates = () => <div>📄 Resume & Cover Letter Templates</div>;

export default InternshipsJobsPage;
