export const initialState = {
  activities: [
    {
      activityID: "1",
      name: "Morning Run",
      steps: 5000,
      caloriesBurned: 350,
      workoutMinutes: 45,
      goalAchieved: true,
      date: "2026-04-20",
    },
    {
      activityID: "2",
      name: "Cycling",
      steps: 0,
      caloriesBurned: 400,
      workoutMinutes: 60,
      goalAchieved: true,
      date: "2026-04-19",
    },
  ],
};

export const activityReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_GOAL":
      return {
        ...state,
        activities: state.activities.map((activity) => {
          if (activity.activityID === action.payload) {
            let newGoalStatus = !activity.goalAchieved;
            
            // Business logic: if steps > 8000: goalAchieved must automatically become true
            if (activity.steps > 8000) {
              newGoalStatus = true;
            }

            // Edge cases: already correct value - no duplicate update
            if (newGoalStatus === activity.goalAchieved) {
              return activity; // return original object
            }

            return { ...activity, goalAchieved: newGoalStatus };
          }
          return activity;
        }),
      };
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "ADD_ACTIVITY":
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };
    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.activityID !== action.payload
        ),
      };
    case "UPDATE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.activityID === action.payload.activityID
            ? action.payload
            : activity
        ),
      };
    default:
      return state;
  }
};
