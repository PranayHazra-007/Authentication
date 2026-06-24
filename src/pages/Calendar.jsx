import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Calendar = () => {
  const tasks = useSelector((state) => state.kanban.tasks);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year,month,1).getDay();

  const daysInMonth = new Date(year,month + 1,0).getDate();

  const monthName = today.toLocaleString( "default", { month: "long" });

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getTasksForDate = (day) => {
    const dateString = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return tasks.filter(
      (task) => task.startDate === dateString
    );
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">

        <div className="card shadow-lg border-0">

          <div className="card-header bg-primary text-white text-center">
            <h2 className="mb-0">
              {monthName} {year} Calendar
            </h2>
          </div>

          <div className="card-body">

            {/* Week Days */}

            <div
              className="d-grid mb-2"
              style={{
                gridTemplateColumns:
                  "repeat(7,1fr)",
                gap: "10px",
              }}
            >
              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((day) => (
                <div
                  key={day}
                  className="text-center fw-bold"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}

            <div
              className="d-grid"
              style={{
                gridTemplateColumns:
                  "repeat(7,1fr)",
                gap: "10px",
              }}
            >
              {calendarDays.map(
                (day, index) => (
                  <div
                    key={index}
                    className="border rounded p-2 bg-light"
                    style={{
                      minHeight: "170px",
                    }}
                  >
                    {day && (
                      <>
                        <div className="fw-bold mb-2 fs-5">
                          {day}
                        </div>

                        {getTasksForDate(
                          day
                        ).map((task) => (
                          <div
                            key={task.id}
                            className="card border-0 shadow-sm mb-2"
                          >
                            <div className="card-body p-2">
                            <div className="small text-primary">
                                👤 {task.username}
                              </div>
                              <div className="mt-1">
                                <span
                                  className={`badge ${
                                    task.status ===
                                    "todo"
                                      ? "bg-secondary"
                                      : task.status ===
                                        "progress"
                                      ? "bg-warning text-dark"
                                      : "bg-success"
                                  }`}
                                >
                                  {task.status.toUpperCase()}
                                </span>
                                 <div className="fw-bold small">
                                {task.caption}
                              </div>

                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )
              )}
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Calendar;