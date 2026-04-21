import React, { createContext, useReducer, useContext, useEffect } from "react";
import { activityReducer, initialState } from "../reducer/ActivityReducer.jsx";
import { getToken, getDataset } from "../services/api.js";

const ActivityContext = createContext();

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const tokenRes = await getToken(
          "E0323050",
          "578597",
          "setB"
        );
        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);
        // The API returns an object { platform: "FitTrack", activities: [...] }
        const activitiesArray = dataset.activities || [];
        dispatch({ type: "SET_ACTIVITIES", payload: activitiesArray });
      } catch (err) {
        // Fallback to initial state if server fails (e.g. invalid set)
        dispatch({ type: "SET_ACTIVITIES", payload: initialState.activities });
      }
    };

    fetchActivities();
  }, []);

  const addActivity = (activity) => {
    dispatch({ type: "ADD_ACTIVITY", payload: activity });
  };

  const deleteActivity = (id) => {
    dispatch({ type: "DELETE_ACTIVITY", payload: id });
  };

  const updateActivity = (activity) => {
    dispatch({ type: "UPDATE_ACTIVITY", payload: activity });
  };

  const toggleGoal = (id) => {
    dispatch({ type: "TOGGLE_GOAL", payload: id });
  };

  return (
    <ActivityContext.Provider
      value={{
        activities: state.activities,
        addActivity,
        deleteActivity,
        updateActivity,
        toggleGoal,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
