import { createSlice } from "@reduxjs/toolkit";

const calculateEndDate = (startDate,milestones) => {
  if (!startDate) return "";

  const totalDays = milestones.reduce((sum, item) => sum + Number(item.days || 0),0);
  const date = new Date(startDate);
  date.setDate(date.getDate() + totalDays-1);
  return date.toISOString().split("T")[0];
};

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: savedTasks,
  taskCounter: savedTasks.length + 1,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,

  reducers: {
    addTask: (state,action) => {
      const newTask = {
        id: Date.now(),
        taskNumber:state.taskCounter,
        username:action.payload.username,
        caption:action.payload.caption,
        shortDescription:action.payload.shortDescription,
        milestones:action.payload.milestones || [],
        startDate:action.payload.startDate,
        endDate:calculateEndDate(action.payload.startDate,action.payload.milestones),
        rating: null,
        status: "todo",
        statusHistory: {
        todo: action.payload.startDate,
        progress: null,
        done: null},
      };

      state.tasks.push(newTask);
      state.taskCounter++;

      localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },

    updateTask: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task && task.status === "todo") {
        task.caption = action.payload.caption;
        task.shortDescription = action.payload.shortDescription;
        task.milestones = action.payload.milestones;
        task.startDate = action.payload.startDate;
        task.endDate = calculateEndDate(action.payload.startDate,action.payload.milestones);
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
      }
    },

    moveTaskForward: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
        if (!task) return;
          if (!task.statusHistory) {
            task.statusHistory = {
               todo: task.startDate,
               progress: null,
               done: null,
              };
              }

        if (task.status === "todo") {
           task.status = "progress";
           task.statusHistory.progress = new Date().toISOString().split("T")[0];
          } else if (task.status === "progress") {
              task.status = "done";
              task.statusHistory.done = new Date().toISOString().split("T")[0];
             }

    localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },

    moveTaskBackward: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;

      if (task.status === "done") {
        task.status = "progress";
        task.statusHistory.done = null;
       }else if (task.status === "progress") {
          task.status = "todo";
          task.statusHistory.progress = null;
      }

      localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },

    updateRating: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);

      if (task && task.status === "done") {
        task.rating = action.payload.rating;
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
      }
    },

    deleteTask: (state,action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task && task.status === "todo") {
        state.tasks = state.tasks.filter((item) => item.id !== action.payload);
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
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