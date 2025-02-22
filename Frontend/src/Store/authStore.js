import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4010/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:4010/api/auth/signup",
        email,
        password,
        name,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ Required for sending cookies/tokens
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
}));
