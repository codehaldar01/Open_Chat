import { create } from "zustand";
import AxiosInstance from "../lib/axios"; // Import the custom axios instance
// Zustand is a small, fast, and scalable bearbones state-management solution using simplified flux principles.
// It is a small, fast, and scalable bearbones state-management solution using simplified flux principles.
import toast from 'react-hot-toast'
const useAuthUser = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            // const response = await fetch("http://localhost:5001/api/auth/check", {
            //     method: "GET",
            //     credentials: "include",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });
            // the method above is used without axios
            // the method below is used with axios
            const response = await AxiosInstance.get("/auth/check");
            // AxiosInstance is a custom axios instance with baseURL and headers set
            //const data = await response.json();// response.data is used with axios
            //set({ authUser: data.user, isCheckingAuth: false });
            set({authUser: response.data});
        } catch (error) {
            console.error("Error checking auth:", error);
            set({authUser: null});
            //set({ isCheckingAuth: false });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (formData) => {
        set({ isSigningUp: true });
        try {
            const response = await AxiosInstance.post("/auth/signup", formData);
            set({ authUser: response.data });
            toast.success("Account Created Successfully");
        } catch (error) {
            console.error("Error signing up:", error);
        }
        finally{
            set({isSigningUp: false});
        }
    },
    signIn: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const response = await AxiosInstance.post("/auth/signin", formData);
            set({ authUser: response.data });
            toast.success("Logged In Successfully");
        } catch (error) {
            console.error("Error logging in:", error);
        }
        finally{
            set({isLoggingIn: false});
        }
    },
    logOut: async () => {
        try {
            const response = await AxiosInstance.post("/auth/signout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Error logging out:", error);
            console.error("Error logging out:", error);
        }
    },

    updateProfile: async (formData) => {
        set({isUpdatingProfile: true});
        try {
            const response = await AxiosInstance.put("/auth/profile-update", formData);
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error updating profile:", error);
            console.error("Error updating profile:", error);
        } finally{
            set({isUpdatingProfile: false});
        }
    },


}));

export default useAuthUser;
// This store is used to manage the authentication state of the user. It uses Zustand for state management.