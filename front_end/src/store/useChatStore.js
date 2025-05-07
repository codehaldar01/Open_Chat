import { create } from "zustand";
import AxiosInstance from "../lib/axios"; // Import the custom axios instance
import toast from 'react-hot-toast'
import { use } from "react";


const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set( { isUsersLoading: true });
        try {
            const response = await AxiosInstance.get("/msg/users")
            set( { users: response.data });
        } catch (error) {
            toast.error("Error fetching users");
            console.error("Error fetching users: ", error);
        } finally {
            set ( { isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set( { isMessagesLoading: true });
        try {
            const response = await AxiosInstance.get(`/msg/${userId}`);
            set( { messages: response.data });
        } catch (error) {
            toast.error("Error fetching messages", error.response.data.message);
            // Display the error message from the server response
            console.error("Error fetching messages: ", error);
        } finally {
            set( { isMessagesLoading: false });
        }
    },

    setSelectedUser: (user) => {
        set( { selectedUser: user })
    },
}))

export default useChatStore;