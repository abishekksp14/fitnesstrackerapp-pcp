import React from "react";
import { useActivity } from "../context/ActivityContext.jsx";

const ActivityItem = ({ activity }) => {
  const { toggleGoal } = useActivity();
  const displayName = activity.name ? activity.name : "unknown";
  const displayDate = activity.date ? activity.date : "no date";

  return (
    <div>
      <h3>{displayName}</h3>
      <p>Date: {displayDate}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {activity.goalAchieved.toString()}</p>
      <button onClick={() => toggleGoal(activity.activityID)}>
        Toggle Goal
      </button>
      <hr />
    </div>
  );
};

export default ActivityItem;
