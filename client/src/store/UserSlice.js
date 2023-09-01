// creatin a slice for user

import { createSlice } from "@reduxjs/toolkit";

//create slice for holding and updating my tasks

const userSlice = createSlice({
  name: "user",
  initialState: { email: "", token: "" },

  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return { email: "", token: "" };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
