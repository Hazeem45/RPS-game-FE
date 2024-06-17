import React from 'react';
import MainLayout from '../layouts/mainLayout/MainLayout';
import DashboardGame from '../components/templates/DashboardGame';
import GameHistory from '../components/templates/GameHistory';
import { useSidebar } from '../utils/SidebarContext';
import { Route, Routes } from 'react-router-dom';
import { useProfile } from '../utils/UserProfileContext';

function Dashboard() {
  const { isHistoryOpen } = useSidebar();
  const { userData } = useProfile();

  return (
    <MainLayout>
      {isHistoryOpen
        ? (
        <Routes>
          <Route path={'/profile/history'} element={<GameHistory username={userData.username} />} />
        </Routes>
          )
        : (
        <DashboardGame />
          )}
    </MainLayout>
  );
}

export default Dashboard;
