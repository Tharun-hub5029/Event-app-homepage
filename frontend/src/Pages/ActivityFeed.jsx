import React, { useEffect, useState } from "react";
import api from "../config/api";
import "../Styles/ActivityFeed.css"; 
import socket from "../config/socket"; // Import WebSocket
import BookmarkButton from "./Bookmark";
import ShareButton from "./ShareButton";
import { jwtDecode } from "jwt-decode";


const ActivityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [showPostBox, setShowPostBox] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", media: null });
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [openCommentBox, setOpenCommentBox] = useState(null);
  const [token,setToken] = useState(localStorage.getItem("_key_"));
  useEffect(() => {
  const stoken = localStorage.getItem("_key_");
      setToken(stoken);
  },[]);
 
  useEffect(() => {
    fetchPosts();
    const checkConnection = () => {
      console.log("✅ WebSocket Connected:", socket.connected);
      
    };
    socket.on("newPost", (post) => {
      console.log("🔄 New Post Received:", post);
      setPosts((prevPosts) => [post, ...prevPosts]);
    });
  
    socket.on("likePost", ({ postId, likes }) => {
      console.log("🔄 Like Event Received - Post ID:", postId, "Total Likes:", likes);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: likes } : post
        )
      );
    });
    
  
    socket.on("commentPost", ({ postId, comment }) => {
      console.log("🔄 New Comment Received:", comment);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), comment],
      }));
    });
  
    return () => {
      socket.off("newPost");
      socket.off("likePost");
      socket.off("commentPost");
    };
  }, []);
  

  const fetchPosts = async () => {
    try {
      const response = await api.get("/api/feed/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleLike = async (postId) => {
    if (!postId) {
      console.error("❌ Error: Post ID is missing");
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  
    try {
      const response = await api.post(
        `/api/feed/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("This is from frontend");
      if (response.status === 200) {
        console.log("✅ Like API Call Successful - Post ID:", postId);
        socket.emit("likePost", { postId });
      } else {
        console.error("❌ Like API Call Failed", response);
      }

    } catch (error) {
      console.error("❌ Error Liking Post:", error);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
    }
  };
  

  const handleFileChange = (event) => {
    setNewPost({ ...newPost, media: event.target.files[0] });
  };

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("content", newPost.content);
      if (newPost.media) {
        formData.append("media", newPost.media);
      }

      const response = await api.post("/api/feed/post", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      // Emit real-time post event
      socket.emit("createPost", response.data);

      setNewPost({ content: "", media: null });
      setShowPostBox(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const toggleCommentBox = (postId) => {
    if (openCommentBox === postId) {
      console.log(null);
      setOpenCommentBox(null);
    } else {
      setOpenCommentBox(postId);
      console.log(postId);
      fetchComments(postId);

    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/api/feed/comments/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.status === 200) {
        setComments((prev) => ({ ...prev, [postId]: response.data }));// Ensure only one update
      }
      console.log("Comments : "+JSON.stringify(comments));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentInput[postId]) return;

    try {
      const response = await api.post(`/api/feed/comment/${postId}`, { text: commentInput[postId] }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Running...");
   
      socket.emit("commentPost", { postId, comment: response.data });
  
      setCommentInput({ ...commentInput, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

const getRelativeTime = (da)=>{
  const now = new Date();
  const past = new Date(da);
  const diffInseconds = Math.floor((now-past)/1000);
 
 
  const timeIntervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
      for(let interval of timeIntervals){
          const count = Math.floor(diffInseconds/interval.seconds);
          if(count>=1){
            return `${count} ${interval.label}${count>1?"s":""} ago`;
          }
      }
      return "Just now";
}

return (
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>

    {/* Create Post Button */}
    <button
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      onClick={() => setShowPostBox(true)}
    >
      + Create Post
    </button>

    {/* Post Upload Box */}
    {showPostBox && (
      <div className="mt-4 p-4 border rounded-lg bg-gray-100">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input type="file" className="mt-2" onChange={handleFileChange} />
        <div className="flex justify-end gap-2 mt-2">
          <button className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={handlePostSubmit}>
            Post
          </button>
          <button className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setShowPostBox(false)}>
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Display Posts */}
    <div className="mt-6 space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <p className="font-semibold text-gray-800">{post.User?.username}</p>
          <p className="text-gray-700">{post.content}</p>
          <p className="text-sm text-gray-500">Updated: {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : "Just now"}</p>

             <div className="flex justify-center items-center w-full h-64">
  <         img src={post.media_url} alt="Post Media" className="max-w-full max-h-full object-cover rounded-lg" />
            </div>


          <div className="mt-2 flex items-center gap-4">
            <button
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => handleLike(post.id)}
            >
              Like ({post.likes})
            </button>
            <button
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => toggleCommentBox(post.id)}
            >
              Comment
            </button>
            <ShareButton post={post} />
          </div>

          {/* Comment Section */}
          {openCommentBox === post.id && (
            <div className="mt-4 p-3 border-t">
              <h4 className="font-semibold">Comments</h4>
              <div className="mt-2 space-y-2">
                {comments[post.id] && comments[post.id].length > 0 ? (
                  comments[post.id].map((comment, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      <strong>{comment.User?.username}</strong>: {comment.text}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet</p>
                )}
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Write a comment..."
                  value={commentInput[post.id] || ""}
                  onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                />
                <button
                  className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() => handleCommentSubmit(post.id)}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
};

export default ActivityFeed