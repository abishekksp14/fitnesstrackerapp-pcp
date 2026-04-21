import React, { useState } from "react";
import { useActivity } from "../context/ActivityContext.jsx";
import ActivityItem from "../components/ActivityItem.jsx";

const Filter = () => {
  const { activities } = useActivity();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleFilter = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (val.trim() === "") {
      setError("Input cannot be empty");
    } else if (isNaN(val)) {
      setError("Please enter a valid number");
    } else {
      setError("");
    }
  };

  // Interdependency: Must filter only valid activities (Q1 rules)
  const validActivities = activities.filter((activity) => {
    return (
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
    );
  });

  // Filter activities where: steps >= input value
  const numericInput = Number(inputValue);
  const filteredActivities = validActivities.filter((activity) => {
    if (error || inputValue.trim() === "") return false;
    return activity.steps >= numericInput;
  });

  return (
    <div>
      <h2>Filter Activities</h2>
      <div>
        <label>Minimum Steps: </label>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleFilter} 
          placeholder="Enter minimum steps..." 
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div style={{ marginTop: "20px" }}>
        {filteredActivities.length === 0 && !error && inputValue.trim() !== "" ? (
          <p>No activities match this criteria.</p>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityItem key={activity.activityID || Math.random()} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default Filter;
