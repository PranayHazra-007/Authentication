import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import {useDispatch,useSelector} from "react-redux";
import {addTask,updateTask,moveTaskForward,moveTaskBackward,updateRating,deleteTask} from "../redux/slices/kanbanSlice";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.kanban.tasks);
  const currentUser=JSON.parse(localStorage.getItem("currentUser")) || {};
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] =useState({
      caption: "",
      shortDescription: "",
      startDate: "",
      endDate: "",
      milestones: [
        {
          name: "",
          days: "",
        },
      ],
    });

  const handleChange = (e) => setFormData({...formData,[e.target.name]: e.target.value});
  
  const handleMilestoneChange = (index,field,value) => {
    const updated =[...formData.milestones];
    updated[index][field] = value;
    setFormData({...formData,milestones: updated});
  };
  const addMilestone = () => {
    setFormData({...formData,milestones: [...formData.milestones,{name: "",days: ""}]});
  };

  const calculateLiveEndDate = () => {
  if (!formData.startDate) return "";
  const totalDays = formData.milestones.reduce((sum, m) => sum + Number(m.days || 0),0);
  const date = new Date(formData.startDate);
  date.setDate(date.getDate() + totalDays -1);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

  const resetForm = () => {
  setFormData({
    caption: "",
    shortDescription: "",
    startDate: "",
    endDate: "",
    milestones: [
      {
        name: "",
        days: "",
      },
    ],
  });

  setEditingId(null);
};

  const handleSubmit = () => {
  if (!formData.caption.trim()) {
    toast.error("Caption is required");
    return;
  }
  if (
    formData.milestones.length === 0 ||
    formData.milestones.some(
      (m) => !m.name.trim() || !m.days
    )
  ) {
    toast.error("Milestones are required");
    return;
  }

  if (!formData.startDate) {
  toast.error("Start date is required");
  return;
}

if (!currentUser?.username) {
  toast.error("Please login first");
  return;
}

  if (editingId) {
    dispatch(
      updateTask({
        id: editingId,
        ...formData,
      })
    );
  } else {
    dispatch(
      addTask({
        ...formData,
        username:
          currentUser?.username ||
          currentUser?.email,
      })
    );
  }

  resetForm();
};

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData({
      caption: task.caption,
      shortDescription: task.shortDescription,
      startDate: task.startDate,
      endDate: task.endDate,
      milestones:task.milestones.map((m) => ({
      name: m.name,
      days: m.days,
    })),
    });
  };
  const removeMilestone = (index) => {
    const updated= [...formData.milestones].filter((_, i) => i !== index);
    setFormData({...formData,milestones: updated});
  }
  const myTasks = tasks.filter((task) => task.username === currentUser?.username);

  const renderTasks = (status) => {
  return myTasks.filter((task) => task.status === status)
  .map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-number">Task #{task.taskNumber}</div>
          <p className="text-primary fw-bold"> User: {task.username}</p>
          <h5>{task.caption}</h5>
          <p>{task.shortDescription}</p>
          <p><strong>Start:</strong>{" "}{task.startDate}</p>
          <p><strong>End:</strong>{" "}{task.endDate}</p>

          <div><strong>Milestones:</strong>
            <ul>{task.milestones.map((m, index) => (
                  <li key={index}>
                    {m.name} ({m.days} Days)
                  </li>
                ))}
            </ul>
          </div>


          {task.status === "done" && (
            <div className="mb-2">
              <label>Rating</label>
              <input type="number" min="1" max="10" className="form-control" value={task.rating || ""}
                onChange={(e) =>
                  dispatch(updateRating({id: task.id,rating:Number(e.target.value)}))
                }/>
            </div>
          )}



          <div className="d-flex flex-wrap gap-2">
            {task.status !== "todo" && (
              <button className="btn btn-secondary btn-sm"
                onClick={() =>
                  dispatch(moveTaskBackward(task.id))}>
                Back
              </button>
            )}

            {task.status !== "done" && (
              <button className="btn btn-success btn-sm"
                onClick={() =>
                  dispatch(moveTaskForward(task.id))}>
                Next
              </button>
            )}

            {task.status === "todo" && (
              <>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(task)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
              </>
            )}
          </div>
        </div>
      ));
  };
  

  return (
    <>
      <Navbar />
          <div className="kanban-header">
             <h2>Project Kanban Board</h2>
               <p className="mb-0">Track tasks, milestones and progress</p>
          </div>
              {/* Kanban Columns */}
         <div className="row mb-4">
           <div className="col-md-4">
             <div className="card stats-card p-3 text-center">
               <h3>{myTasks.length}</h3>
                 <p>Total Tasks</p>
             </div>
           </div>

           <div className="col-md-4">
              <div className="card stats-card p-3 text-center">
                <h3>{myTasks.filter(t => t.status === "progress").length}</h3>
                  <p>In Progress</p>
              </div>
           </div>

           <div className="col-md-4">
              <div className="card stats-card p-3 text-center">
                 <h3>{myTasks.filter(t => t.status === "done").length}</h3>
                   <p>Completed</p>
              </div>
           </div>
         </div>
            {/* Kanban Board */}
          <div className="container mt-4 kanban-page">
              <h2 className="mb-4">Kanban Board</h2>
                <div className="card p-4 mb-4 kanban-form">
                   <h4>{editingId ? "Edit Task" : "Create Task"}</h4>
                     <input type="text" className="form-control mb-3" placeholder="Caption" name="caption" value={formData.caption} onChange={handleChange}/>

          <textarea className="form-control mb-3" rows="3"placeholder="Short Description" name="shortDescription" value={formData.shortDescription} onChange={handleChange}/>
              <div className="row">
                <div>
                  <label>Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange}/>
                    <div className="mt-2">
                      <strong>End Date:</strong>{" "}{calculateLiveEndDate() || "N/A"}
                    </div>
                </div>
               </div>
          <hr/>
          <h5>Milestones</h5>

          {formData.milestones.map((milestone, index) => (
              <div className="row mb-2" key={index}>
                <div className="col-md-8">
                  <input type="text" className="form-control" placeholder="Milestone Name"value={milestone.name}
                    onChange={(e) =>handleMilestoneChange(index,"name",e.target.value)}/>
                </div>
                <div className="col-md-4">
                  <input type="number" className="form-control" placeholder="Days" value={milestone.days}
                    onChange={(e) =>handleMilestoneChange(index,"days",e.target.value)}/>
                </div>
                {formData.milestones.length > 1 && (
                    <div className="col-md-12">
                      <button className="btn btn-danger" onClick={() => removeMilestone(index)}>Remove Milestone</button>
                    </div>
                  )}
              </div>
            ))}

          <button className="btn btn-info mb-3" onClick={addMilestone}>Add More Milestone</button>
          <br/>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editingId ? "Update Task" : "Add Task"}
          </button>
         </div>
        <div className="row">
          <div className="col-md-4 kanban-column">
            <div className="todo-header">
               <h5 className="mb-0">TO DO</h5>
            </div>
            {renderTasks("todo")}
          </div>

          <div className="col-md-4 kanban-column">
            <div className="progress-header"><h5 className="mb-0">PROGRESS</h5></div>
                 {renderTasks("progress")}
          </div>

          <div className="col-md-4 kanban-column">
            <div className="done-header"><h5 className="mb-0">DONE</h5></div>
            {renderTasks("done")}
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;