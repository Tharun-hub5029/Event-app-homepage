const Connection = require("../model/Connection");
const { getIo } = require("../config/socket");
const { Op } = require("sequelize");



const emitSocketEvent = (userId, event, data) => {
    const io = getIo();
    io.to(`user-${userId}`).emit(event, data);
};


exports.sendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender and Receiver IDs are required" });
        }

        const existingReq = await Connection.findOne({ where:{[Op.or]:[
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId }
         ]}});
        if (existingReq) {
            return res.status(409).json({ message: "Request already sent" });
        }

        const connection = await Connection.create({ senderId, receiverId, status: "pending" });

        emitSocketEvent(receiverId, "new-request", { senderId, receiverId });

        res.status(201).json({ message: "Request sent successfully!", connection });
    } catch (error) {
        res.status(500).json({ message: "Error while sending request", error: error.message });
    }
};


exports.acceptRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const connection = await Connection.findOne({ where: { senderId, receiverId, status: "pending" } });
        if (!connection) {
            return res.status(404).json({ message: "Request not found or already accepted" });
        }

        connection.status = "accepted";
        await connection.save();

        emitSocketEvent(senderId, "request-accepted", { senderId, receiverId });
        emitSocketEvent(receiverId, "request-accepted", { senderId, receiverId });

        res.status(200).json({ message: "Request accepted!" });
    } catch (error) {
        res.status(500).json({ message: "Error while accepting request", error: error.message });
    }
};

// ✅ Reject Friend Request
exports.rejectRequest = async (req, res) => {
    const { requestId, senderId } = req.body;
    try {
        const connection = await Connection.findOne({ where: { id: requestId, status: "pending" } });
        if (!connection) {
            return res.status(404).json({ message: "Request not found or already handled" });
        }

        await connection.destroy();

        emitSocketEvent(senderId, "request-rejected", { requestId });

        res.status(200).json({ message: "Request rejected!" });
    } catch (error) {
        res.status(500).json({ message: "Error while rejecting request", error: error.message });
    }
};

// ✅ Get Pending Requests
exports.getAllRequests = async (req, res) => {
    const userId = req.params.id;
    try {
        const requests = await Connection.findAll({ 
            where: { receiverId: userId, status: "pending" },
            attributes: ["id", "senderId", "createdAt"]
        });

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching requests", error: error.message });
    }
};

// ✅ Get Accepted Connections
exports.getConnections = async (req, res) => {
    const userId = req.params.userId;
    try {
        const connections = await Connection.findAll({
            where: { [Op.or]:[{senderId:userId},{receiverId:userId}], status: "accepted" },
            attributes: ["id", "senderId", "receiverId", "createdAt"],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json(connections);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching connections", error: error.message });
    }
};
