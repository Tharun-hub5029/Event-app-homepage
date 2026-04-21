import React, { use, useState } from "react";
import { FiArrowLeft, FiMessageCircle, FiTrendingUp, FiFolder, FiPlusCircle, FiFileText, FiImage, FiTag, FiUser, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const ForumPage = () => {
  const [activeTab, setActiveTab] = useState("forum-feed");
  const navigate = useNavigate();
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
          <SidebarButton active={activeTab === "forum-feed"} onClick={() => setActiveTab("forum-feed")} icon={<FiMessageCircle />} label="Forum Feed" />
          <SidebarButton active={activeTab === "trending"} onClick={() => setActiveTab("trending")} icon={<FiTrendingUp />} label="Trending" />
          <SidebarButton active={activeTab === "topics"} onClick={() => setActiveTab("topics")} icon={<FiFolder />} label="Topics" />
          <SidebarButton active={activeTab === "create-forum"} onClick={() => setActiveTab("create-forum")} icon={<FiPlusCircle />} label="Create Forum" />
        </nav>

        {/* Topics Dropdown */}
        {activeTab === "topics" && (
          <select className="mt-6 bg-gray-800 text-white p-2 rounded-md">
            <option>Technology</option>
            <option>Science</option>
            <option>Mathematics</option>
            <option>Education</option>
            <option>Business</option>
          </select>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
        {activeTab === "forum-feed" && <ForumFeed />}
        {activeTab === "trending" && <Trending />}
        {activeTab === "topics" && <TopicView />}
        {activeTab === "create-forum" && <CreateForum />}
      </main>
    </div>
  );
};

/* Sidebar Button Component */
const SidebarButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center space-x-3 p-3 rounded-md transition duration-200 ${active ? "bg-blue-600" : "hover:bg-gray-700"}`}>
    {icon}
    <span>{label}</span>
  </button>
);

/* Forum Feed */
const ForumFeed = () => {
  const posts = [
    { user: "Alice", content: "What’s the best JavaScript framework?", tags: ["#JavaScript", "#React"], replies: 12 },
    { user: "Bob", content: "How to optimize SQL queries?", tags: ["#Databases", "#SQL"], replies: 8 },
    { user: "Charlie", content: "New AI trends in 2025!", tags: ["#AI", "#MachineLearning"], replies: 15 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Forum Feed</h2>
      {posts.map((post, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
          <h3 className="font-semibold">{post.user}</h3>
          <p className="text-gray-700">{post.content}</p>
          <div className="flex space-x-3 mt-2">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-blue-500"> {tag} </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">{post.replies} replies</p>
        </div>
      ))}
    </div>
  );
};

/* Trending Section */
const Trending = () => {
  const trendingChannels = [
    { name: "JavaScript", members: "15K" },
    { name: "AI & ML", members: "10K" },
    { name: "Cybersecurity", members: "8K" },
    { name: "Web Dev", members: "12K" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Trending Channels</h2>

      {/* Search Bar */}
      <input type="text" placeholder="Search for channels..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      {/* Grid View */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {trendingChannels.map((channel, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="font-semibold">{channel.name}</h3>
            <p className="text-sm text-gray-500">{channel.members} members</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Topic View */
const TopicView = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Topic Discussions</h2>
    <p>Choose a topic from the sidebar to explore related forums.</p>
  </div>
);

/* Create Forum */
const CreateForum = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a Forum Post</h2>
      <input type="text" placeholder="Title" className="w-full px-4 py-2 border rounded-lg mb-3" />
      <textarea placeholder="Write your post..." className="w-full px-4 py-2 border rounded-lg mb-3"></textarea>

      {/* File Upload & Poll Options */}
      <div className="flex space-x-3 mb-3">
        <button className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-md">
          <FiFileText /> <span>Code Snippet</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-md">
          <FiImage /> <span>Attach Image</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-md">
          <FiTag /> <span>Tags</span>
        </button>
      </div>

      {/* Anonymous Option */}
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="anonymous" className="h-4 w-4" />
        <label htmlFor="anonymous" className="text-gray-700">Post Anonymously</label>
      </div>

      {/* Submit Button */}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Post</button>
    </div>
  );
};

export default ForumPage;
