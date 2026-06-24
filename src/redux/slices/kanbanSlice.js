import { createSlice } from "@reduxjs/toolkit";

const calculateEndDate = (startDate,milestones) => {
  if (!startDate) return "";
  const totalDays = milestones.reduce((sum, item) => sum + Number(item.days || 0),0);
  const date = new Date(startDate);
  date.setDate(date.getDate() + totalDays);

  return date.toISOString().split("T")[0];
};

const initialState = {
  tasks: [],
  taskCounter: 1,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,

  reducers: {
    // Add Task
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        taskNumber:state.taskCounter,
        username:action.payload.username,
        caption:action.payload.caption,
        shortDescription:action.payload.shortDescription,
        milestones:action.payload.milestones ||[],
        startDate:action.payload.startDate,
        endDate:calculateEndDate(action.payload.startDate,action.payload.milestones),
        rating: null,
        status: "todo",
      });

      state.taskCounter += 1;
    },

    // Edit Task (Only TODO)
    updateTask: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);

      if (task && task.status === "todo") {
        task.caption = action.payload.caption;
        task.shortDescription = action.payload.shortDescription;
        task.milestones = action.payload.milestones;
        task.startDate = action.payload.startDate;
        task.endDate = calculateEndDate(action.payload.startDate,action.payload.milestones);
      }
    },
    // Move Forward
    moveTaskForward: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;
      if (task.status === "todo") {
        task.status = "progress";
      } else if (task.status === "progress") {
        task.status = "done";
      }
    },

    // Move Back
    moveTaskBackward: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;
      if (task.status === "done") {
        task.status = "progress";
      } else if (task.status === "progress") {
        task.status = "todo";
      }
    },

    // Rating only for DONE
    updateRating: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task && task.status === "done") {
        task.rating = action.payload.rating;
      }
    },

    // Delete only TODO
    deleteTask: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task && task.status === "todo") {
        state.tasks = state.tasks.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  moveTaskForward,
  moveTaskBackward,
  updateRating,
  deleteTask,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;