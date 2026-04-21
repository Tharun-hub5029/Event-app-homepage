import React, { useEffect, useState } from "react";


import { jwtDecode } from "jwt-decode";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState(["Complete project milestone", "Prepare for the study group session"]);
  const [followers, setFollowers] = useState(["John Doe", "Alice Smith", "Robert Brown"]);
  const [following, setFollowing] = useState(["Emma Wilson", "Chris Johnson", "Sophia Lee"]);

  const token = localStorage.getItem("_key_");
  const decode = jwtDecode(token);
  const userId = decode?.id || null;
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_data"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <p className="text-center text-red-500">User not logged in</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white p-6 rounded-lg shadow-lg relative">
      {/* Profile Info */}
      <div className="flex items-center space-x-4">
        <img src={user.profile_pic || "default-avatar.png"} alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-500" />
        <div>
          <h2 className="text-2xl font-bold">{user.full_name}</h2>
          <p className="text-gray-400">@{user.username}</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="mt-4">
        <p><strong>Email:</strong> {user.university_email}</p>
        <p><strong>Personal Email:</strong> {user.personal_email}</p>
        <p><strong>Contact:</strong> {user.contact_number}</p>
      </div>

      {/* Skills & Interests */}
      <div className="mt-4">
        <p><strong>Skills:</strong> {user.skills?.join(", ") || "Not provided"}</p>
        <p><strong>Interests:</strong> {user.interests?.join(", ") || "Not provided"}</p>
      </div>

      {/* Role & Privacy Settings */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button onClick={() => setProfileVisibility(!profileVisibility)} className="bg-blue-500 px-4 py-2 rounded">
          {profileVisibility ? "Make Profile Private" : "Make Profile Public"}
        </button>
      </div>

      {/* Followers & Following Section */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold">Connections</h3>
        <div className="flex justify-between">
          <div>
            <h4 className="text-lg font-semibold">Followers</h4>
            <ul className="list-disc ml-4">
              {followers.map((follower, index) => (
                <li key={index}>{follower}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Following</h4>
            <ul className="list-disc ml-4">
              {following.map((follow, index) => (
                <li key={index}>{follow}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reminders in Center */}
      <div className="mt-6 text-center bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold">Reminders</h3>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index} className="text-gray-300">{reminder}</li>
          ))}
        </ul>
      </div>

      {/* Bottom-Right Calendar */}
      <div className="absolute bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-center">Calendar</h3>
        <Calendar onChange={setDate} value={date} className="rounded-lg" />
      </div>
    </div>
  );
};

export default Profile;
