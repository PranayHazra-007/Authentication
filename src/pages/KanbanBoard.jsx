import React, { useState } from "react";
import Navbar from "../components/Navbar";

import {useDispatch,useSelector} from "react-redux";

import {addTask,moveTask,deleteTask} from "../redux/slices/kanbanSlice";

const KanbanBoard = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.kanban.tasks);

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    dispatch(
      addTask({
        id: Date.now(),
        title: taskTitle,
        status: "todo",
      })
    );

    setTaskTitle("");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Kanban Board
        </h2>

        <div className="d-flex mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Enter Task"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
          />

          <button
            className="btn btn-primary ms-2"
            onClick={handleAddTask}
          >
            Add Task
          </button>

        </div>

        <div className="row">

          {/* TODO */}

          <div className="col-md-4">
            <div className="card p-3">

              <h4>To Do</h4>

              {tasks
                .filter(
                  (task) =>
                    task.status === "todo"
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="card p-2 mb-2"
                  >
                    <p>{task.title}</p>

                    <button
                      className="btn btn-success btn-sm mb-2"
                      onClick={() =>
                        dispatch(
                          moveTask({
                            id: task.id,
                            status:
                              "inprogress",
                          })
                        )
                      }
                    >
                      Move →
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        dispatch(
                          deleteTask(
                            task.id
                          )
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* IN PROGRESS */}

          <div className="col-md-4">
            <div className="card p-3">

              <h4>In Progress</h4>

              {tasks
                .filter(
                  (task) =>
                    task.status ===
                    "inprogress"
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="card p-2 mb-2"
                  >
                    <p>{task.title}</p>

                    <button
                      className="btn btn-success btn-sm mb-2"
                      onClick={() =>
                        dispatch(
                          moveTask({
                            id: task.id,
                            status:
                              "done",
                          })
                        )
                      }
                    >
                      Move →
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        dispatch(
                          deleteTask(
                            task.id
                          )
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* DONE */}

          <div className="col-md-4">
            <div className="card p-3">

              <h4>Done</h4>

              {tasks
                .filter(
                  (task) =>
                    task.status === "done"
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="card p-2 mb-2"
                  >
                    <p>{task.title}</p>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        dispatch(
                          deleteTask(
                            task.id
                          )
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default KanbanBoard;