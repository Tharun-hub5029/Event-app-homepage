import socket from "./socket";
import { useState, useEffect } from "react";

const Notifications = ({ userId }) => { // 🔥 [ADDED] Pass userId to join room
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (userId) {
            socket.emit("join-room", userId); // **🔥 [ADDED] User joins their unique room**
        }

        socket.on("new-request", (data) => {
            console.log("New request received:", data);
            setNotifications((prev) => [...prev, { message: "New Connection Request", senderId: data.senderId }]);
        });

        socket.on("request-accepted", (data) => {
            setNotifications((prev) => [...prev, { message: "Your connection request was accepted!", receiverId: data.receiverId }]);
        });

        socket.on("request-rejected", () => {
            setNotifications((prev) => [...prev, { message: "Your connection request was rejected." }]);
        });

        socket.on("new-requests", (data) => {
            console.log("New requests received:", data);
            setNotifications((prev) => [...prev, { message: "All New Connection Requests", senderId: data.senderId }]);
        });

        socket.on("new-connections", (data) => {
            setNotifications((prev) => [...prev, { message: "All new Connections", senderId: data.senderId, receiverId: data.receiverId }]);
        });

        return () => {
            socket.off("new-request");
            socket.off("request-accepted");
            socket.off("request-rejected");
            socket.off("new-requests");
            socket.off("new-connections");
        };
    }, [userId]); // **🔥 [ADDED] Ensure effect runs when userId changes**

    return (
        <div>
            {notifications.map((n, index) => (
                <p key={index}>{n.message}</p>
            ))}
        </div>
    );
};

export default Notifications;
