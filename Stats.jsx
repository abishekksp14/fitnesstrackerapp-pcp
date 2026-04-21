import React from "react";
import { useActivity } from "../context/ActivityContext.jsx";

const Stats = () => {
  const { activities } = useActivity();

  // Compute dynamically using .reduce() — must not store in state
  // Edge case: ignore invalid activities, exclude invalid goalAchieved values
  const stats = activities.reduce(
    (acc, activity) => {
      // Apply Q1 validity rules
      if (
        activity.steps > 0 &&
        activity.caloriesBurned > 0 &&
        activity.workoutMinutes > 0 &&
        typeof activity.goalAchieved === "boolean"
      ) {
        acc.totalActivities += 1;
        if (activity.goalAchieved === true) {
          acc.goalAchievedCount += 1;
        } else if (activity.goalAchieved === false) {
          acc.goalNotAchievedCount += 1;
        }
        // if goalAchieved is not a strict boolean, it is excluded (handled by typeof check above)
      }
      return acc;
    },
    { totalActivities: 0, goalAchievedCount: 0, goalNotAchievedCount: 0 }
  );

  // Global state requirement: window.appState
  window.appState = {
    totalActivities: stats.totalActivities,
    goalAchievedCount: stats.goalAchievedCount,
    goalNotAchievedCount: stats.goalNotAchievedCount,
  };

  return (
    <div>
      <h2>Activities Analytics Dashboard</h2>

      <div data-testid="total-activities">
        <strong>Total Valid Activities:</strong> {stats.totalActivities}
      </div>

      <div data-testid="goal-achieved">
        <strong>Goal Achieved Count:</strong> {stats.goalAchievedCount}
      </div>

      <div data-testid="goal-not-achieved">
        <strong>Goal Not Achieved Count:</strong> {stats.goalNotAchievedCount}
      </div>
    </div>
  );
};

export default Stats;
