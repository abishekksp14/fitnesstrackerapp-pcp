import React from "react";
import { useParams, Link } from "react-router-dom";
import { useActivity } from "../context/ActivityContext.jsx";

const ActivityDetail = () => {
  const { id } = useParams();
  const { activities } = useActivity();
  
  // Validate ID
  const activity = activities.find((a) => a.activityID === id || a.activityID === Number(id));

  if (!activity) {
    return (
      <div>
        <h2>Activity not found</h2>
        <Link to="/activities">Back to Activities</Link>
      </div>
    );
  }

  // Calculate efficiency score (handle division by zero safely)
  let efficiency = 0;
  if (activity.workoutMinutes && activity.workoutMinutes > 0) {
    efficiency = activity.caloriesBurned / activity.workoutMinutes;
  }

  const displayName = activity.name ? activity.name : "unknown";
  const displayDate = activity.date ? activity.date : "no date";

  return (
    <div>
      <Link to="/activities">Back to Activities</Link>
      <h2>{displayName}</h2>
      <p>Date: {displayDate}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {activity.goalAchieved ? activity.goalAchieved.toString() : "false"}</p>
      <p>Efficiency (Calories / Min): {efficiency.toFixed(2)}</p>
    </div>
  );
};

export default ActivityDetail;
