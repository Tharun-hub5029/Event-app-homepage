import { useState, useEffect } from "react";
import api from '../config/api';

const BookmarkButton = ({ userId}) => {
    const [isSaved, setIsSaved] = useState(false);
    const token = localStorage.getItem("_key_");

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const res = await api.get(`/api/savedPosts/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const saved = res.data;
                setIsSaved(saved);
            } catch (error) {
                console.error("Error fetching saved posts:", error);
            }
        };
        fetchSavedPosts();
    }, [userId]);

    const toggleButton = async () => {
        if (isSaved) {
            try {
                await api.delete("/api/savedPosts/remove", {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { userId, postId } 
                });
                setIsSaved(false);
            } catch (error) {
                console.error("Error deleting saved post:", error);
            }
        } else {
            try {
                await api.post("/api/savedPosts/save", { userId, postId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsSaved(true);
            } catch (error) {
                console.error("Error saving post:", error);
            }
        }
    };

    return (
        <button onClick={toggleButton}>
            {isSaved ? "Unsave" : "Save"}
        </button>
    );
};

export default BookmarkButton;
