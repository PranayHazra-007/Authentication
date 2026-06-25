import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Calendar = () => {
  const tasks = useSelector((state) => state.kanban.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();
  const firstDay = new Date(year,month,1).getDay();
  const daysInMonth = new Date(year,month + 1,0).getDate();

  const monthName = currentDate.toLocaleString("default",{month: "long",});
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }
  const getStatusForDate = (
  task,
  currentDay
) => {
  const todoDate = new Date(
    task.statusHistory?.todo
  );

  const progressDate =
    task.statusHistory?.progress
      ? new Date(
          task.statusHistory.progress
        )
      : null;

  const doneDate =
    task.statusHistory?.done
      ? new Date(
          task.statusHistory.done
        )
      : null;

  if (
    doneDate &&
    currentDay >= doneDate
  ) {
    return "done";
  }

  if (
    progressDate &&
    currentDay >= progressDate
  ) {
    return "progress";
  }

  return "todo";
};
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const handleMonthChange = (e) => {
    setCurrentDate(new Date(year,Number(e.target.value),1));
  };
  const handleYearChange = (e) => {
    setCurrentDate(new Date(Number(e.target.value),month,1));
  };

  const isToday = (day) => {
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const getTasksForDate = (day) => {
    const currentDay = new Date(year,month,day);

    return tasks.filter((task) => {
      if (!task.startDate || !task.endDate) {
        return false;
      }

      const startDate = new Date(task.startDate);
      const endDate = new Date(task.endDate);
      startDate.setHours(0,0,0,0);
      endDate.setHours(0,0,0,0);
      currentDay.setHours(0,0,0,0);

      return (currentDay >= startDate && currentDay <= endDate);
    });
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <button className="btn btn-light" onClick={previousMonth}>← Previous</button>

              <div className="text-center">
                <h4 className="mb-2">{monthName} {year}</h4>
                <div className="d-flex gap-2">
                  <select className="form-select" value={month} onChange={handleMonthChange}>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((monthName,index) => (
                        <option key={index} value={index}>{monthName}</option>
                      ))}
                  </select>

                  <select className="form-select" value={year} onChange={handleYearChange}>
                    {Array.from({length: 21,},(_, i) => 2020 + i).map((year) => (
                        <option key={year} value={year} >{year} </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <button className="btn btn-light" onClick={nextMonth}>Next →</button>
            </div>
          </div>

          <div className="card-body">
            <div className="d-grid mb-3" style={{gridTemplateColumns:"repeat(7,1fr)",gap: "10px",}}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat",].map((day) => (
                <div key={day} className="text-center fw-bold fs-5" >{day}</div>
              ))}
            </div>

            <div className="d-grid" style={{gridTemplateColumns:"repeat(7,1fr)",gap: "10px",}}>
              {calendarDays.map((day, index) => (
                  <div key={index} className="rounded p-2" style={{minHeight: "180px",border: isToday(day)? "3px solid #0d6efd" : "1px solid #dee2e6",backgroundColor:isToday(day)? "#e7f1ff" : "#f8f9fa",}}>
                    {day && (
                      <>
                        <div className={`fw-bold fs-5 mb-2 ${isToday(day)? "text-primary": ""}`}>
                          {day} {isToday(day) && " 📍"}
                        </div>
                        {getTasksForDate(day).map((task) => {
  const currentDay = new Date(year, month, day);

  const status = getStatusForDate(
    task,
    currentDay
  );

  return (
    <div
      key={`${task.id}-${day}`}
      className="card border-0 shadow-sm mb-2"
    >
                            <div className="card-body p-2">
                              <div className="small text-primary fw-semibold">
                                👤{" "}{task.username}
                              </div>
                              <div className="fw-bold small">
                                📝{" "}{task.caption}
                              </div>

                              <div className="small text-muted">
                                {task.startDate}{" → "}{task.endDate}
                              </div>

                              <span
  className={`badge mt-1 ${
    status === "todo"
      ? "bg-secondary"
      : status === "progress"
      ? "bg-warning text-dark"
      : "bg-success"
  }`}
>
  {status.toUpperCase()}
</span>
                            </div>
                          </div>
                        )})}
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;