import React from "react";
import { useActivity } from "../context/ActivityContext.jsx";
import ActivityItem from "../components/ActivityItem.jsx";

const Activities = () => {
  const { activities } = useActivity();

  // Requirements: Display only valid activities
  // Conditions: steps>0, caloriesBurned>0, workoutMinutes>0, goalAchieved must be boolean
  // Constraints: Must use .filter(), must use context data, must not mutate dataset
  const validActivities = activities.filter((activity) => {
    return (
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
    );
  });

  return (
    <div>
      <h2>Fitness Activities</h2>
      <div>
        {validActivities.length === 0 ? (
          <p>No valid activities found.</p>
        ) : (
          validActivities.map((activity) => (
            <ActivityItem key={activity.activityID || Math.random()} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default Activities;
