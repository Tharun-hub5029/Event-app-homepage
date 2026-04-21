import { useState ,useEffect} from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
 import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import UserDashboard from './Pages/UserDashboard';
import ProtectedRoute from './config/ProtectedRoute';
import ActivityFeed from './Pages/ActivityFeed';
import Events from './Pages/Events';
import Forums from './Pages/Forums';
import Messages from './Pages/Messages';
import StudyGroups from './Pages/StudyGroups';
import CareerGuidance from './Pages/CareerGuidance';
import Profile from './Pages/Profile';
import Network from './Pages/Network';
import socket from './config/socket';
import { jwtDecode } from 'jwt-decode';
import Logout from './Pages/Logout';
import Home from './Pages/Home';
import HackathonPage from './Pages/Hackathon';
import MentorBookingPage from './Pages/MentorBooking';
import ProjectCollaboration from './Pages/ProjectCollaboration';
import InternshipsJobs from './Pages/Internships&Job';

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("_key_");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);

      console.log("Room Joined");
      socket.emit("join-room", `user-${decoded.id}`);
    }

    return () => {
      
      socket.emit("leave-room", `user-${userId}`);
    };
  }, []);
  return (
    <>
      <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/userdashboard" element={<UserDashboard />}>
         
            <Route index element={<ActivityFeed />} />

            <Route path="activity_feed" element={<ActivityFeed />} />
            <Route path="events" element={<Events />} />
           
           
            
           
            <Route path="logout" element={<Logout />} />
          </Route>

        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="events" element={<Events />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="hackathons" element={<HackathonPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="project-collaboration" element={<ProjectCollaboration />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="forums" element={<Forums />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="network" element={<Network />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="/study-groups" element={<StudyGroups />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="/messages" element={<Messages/>} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="/career_guidance" element={<CareerGuidance/>} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="/mentor-bookings" element={<MentorBookingPage/>} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="/internships-jobs" element={<InternshipsJobs/>} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
           <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </Router>
      </div>
    </>
  )
}

export default App
