import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const kanbanSlice = createSlice({
  name: "kanban",

  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    moveTask: (state, action) => {
      const { id, status } = action.payload;

      const task = state.tasks.find(
        (item) => item.id === id
      );

      if (task) {
        task.status = status;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const {
  addTask,
  moveTask,
  deleteTask,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;