import { createSlice } from "@reduxjs/toolkit";

//create slice for holding and updating my tasks

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],

  reducers: {
    // addTask: (state, action) => {
    //   state.push(action.payload);
    // },
    // removeTask: (state, action) => {
    //   return state.filter((task) => task._id !== action.payload);
    // },
    // updateTask: (state, action) => {
    //   const index = state.findIndex((task) => task._id === action.payload._id);
    //   if (index !== -1) {
    //     state[index] = action.payload;
    //   }
    // },
    setTasks: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
