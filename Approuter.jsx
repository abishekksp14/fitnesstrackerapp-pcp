import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import MainLayout from "../layout/Mainlayout.jsx";
import Activities from "../pages/Activities.jsx";
import ActivityDetail from "../pages/ActivityDetail.jsx";
import Filter from "../pages/Filter.jsx";
import Stats from "../pages/Stats.jsx";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
