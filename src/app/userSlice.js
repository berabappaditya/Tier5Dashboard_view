import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
  dashboard: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.dashboard = action.payload.dashboard;
    },
    delUser: (state) => {
      state.userName = "";
      state.email = "";
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload.dashboard;
    },
  },
});

export const { setUser, delUser, setDashboard } = userSlice.actions;
export default userSlice.reducer;
