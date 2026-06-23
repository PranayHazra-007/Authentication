import { createSlice } from "@reduxjs/toolkit";

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
        taskNumber: state.taskCounter,
        caption: action.payload.caption,
        shortDescription: action.payload.shortDescription,
        milestones: action.payload.milestones || [],
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        rating: null,
        status: "todo",
      });
      state.taskCounter += 1;
    },

    // Edit Task (Only TODO)
    updateTask: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);

      if (task && task.status === "todo") {
        task.caption = action.payload.caption;
        task.shortDescription = action.payload.shortDescription;
        task.milestones = action.payload.milestones;
        task.startDate = action.payload.startDate;
        task.endDate = action.payload.endDate;
      }
    },
    // Forward
    moveTaskForward: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;
      if (task.status === "todo") {task.status = "progress";}
       else if (task.status === "progress") {task.status = "done";}
    },
    // Back 
    moveTaskBackward: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;
      if (task.status === "done") {task.status = "progress";} 
      else if (task.status === "progress") {task.status = "todo";}
    },

    // Rating only DONE
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
        state.tasks =state.tasks.filter((item) => item.id !== action.payload);
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