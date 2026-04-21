import api from "../config/api";





export const sendConnectionRequest = async (senderId, receiverId,token) => {
  return await api.post("/api/connections/send-request", { senderId, receiverId },{
    headers:{Authorization : `Bearer ${token}`}
  });
};

export const acceptConnectionRequest = async (token, receiverId, senderId) => {
  
  return await api.post("/api/connections/accept-request", {receiverId,senderId},{
    headers:{Authorization : `Bearer ${token}`}
  });
};

export const rejectConnectionRequest = async (requestId, senderId) => {
  return await api.post("/api/connections/reject-request", { requestId, senderId },{
    headers:{Authorization : `Bearer ${token}`}
  });
};
