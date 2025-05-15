import { create } from "zustand";
import AxiosInstance from "../lib/axios"; // Import the custom axios instance
import toast from 'react-hot-toast'
import { use } from "react";
import { io } from "socket.io-client";
import useAuthUser from "./useAuthUser";

const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await AxiosInstance.get("/msg/users")
            set({ users: response.data });
        } catch (error) {
            toast.error("Error fetching users");
            console.error("Error fetching users: ", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await AxiosInstance.get(`/msg/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error("Error fetching messages", error.response.data.message);
            // Display the error message from the server response
            console.error("Error fetching messages: ", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user })
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await AxiosInstance.post(`/msg/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
            toast.success("Message sent successfully");
        } catch (error) {
            toast.error("Error sending message", error.response.data.message);
            console.error("Error sending message: ", error);

        }
    },
    //optimize this later
    subscribeToNewMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const { socket, authUser } = useAuthUser.getState();
        socket.on('newMsg', (newMessage) => {
            const isRelevant =
                (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id) ||
                (newMessage.receiverId === selectedUser._id && newMessage.senderId === authUser._id);
            if (!isRelevant) return;
            set({ messages: [...get().messages, newMessage], })
        });
    },

    unsubscribeFromNewMessages: () => {
        const { socket } = useAuthUser.getState();
        if(!socket) return;
        socket.off('newMsg');
    },
}))

export default useChatStore;