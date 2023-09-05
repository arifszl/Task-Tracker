// creatin a slice for user

import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

//create slice for holding and updating my tasks
//persitent state for user
//making email and token data from local storage
const userSlice = createSlice({
  name: "user",
  initialState: {
    email: JSON.parse(localStorage.getItem("user"))?.email || null,
    token: JSON.parse(localStorage.getItem("user"))?.token || null,
  },

  reducers: {
    setUser: (state, action) => {
      //update user

      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      //remove user
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
