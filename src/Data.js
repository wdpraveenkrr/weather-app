import React, { useEffect, useState } from "react";
import "./Data.css";
function Data() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const month = currentDate.getMonth();

  // const[ismonth,setIsMonth]=useState([]);

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatzero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const formatHour = (hour) => {
    return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  };
  return (
    <div className="data">
      <div className="date">{formatDate(currentTime)}</div>
      <div className="hour">
        {formatzero(formatHour(currentTime.getHours()))}:
        {formatzero(currentTime.getMinutes())}{" "}
      </div>
      {/* <p className="ampm">{currentTime.getHours()>=12 ? "PM":"AM"}</p> */}
    </div>
  );
}

export default Data;
