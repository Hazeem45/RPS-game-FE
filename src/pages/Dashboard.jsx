import React from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import DashboardGame from "../components/templates/DashboardGame";
import GameHistory from "../components/templates/GameHistory";
import {useSidebar} from "../utils/SidebarContext";
import {Route, Routes} from "react-router-dom";

function Dashboard() {
  const {isHistoryOpen} = useSidebar();
  const username = localStorage.getItem("username");

  return (
    <MainLayout>
      {isHistoryOpen ? (
        <Routes>
          <Route path={`/profile/${username}/history`} element={<GameHistory username={username} />} />
        </Routes>
      ) : (
        <DashboardGame />
      )}
    </MainLayout>
  );
}

export default Dashboard;
