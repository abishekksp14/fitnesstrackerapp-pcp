import React from "react";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Link to="/activities">
          FitTrack Pro
        </Link>
        <nav>
          <ul>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/filter">Filter</Link></li>
            <li><Link to="/stats">Stats</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
