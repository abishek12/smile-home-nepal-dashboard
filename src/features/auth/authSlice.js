import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage
const loadAuthState = () => {
  // Check if localStorage is available (not during SSR)
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }
    return JSON.parse(serializedState);
  } catch {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Persist to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear from localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
