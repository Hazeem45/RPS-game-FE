import "./assets/GlobalStyle.css";
import "./components/elements/style.css";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GameLayout from "./layouts/gameLayout/GameLayout";
import GameVersusCom from "./pages/GameVersusCom";
import CreateRoom from "./pages/CreateRoom";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import History from "./pages/History";
import {SidebarProvider} from "./utils/SidebarContext";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <Dashboard />
            </SidebarProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <History />
            </SidebarProvider>
          </ProtectedRoute>
        }
      />
      <Route element={<GameLayout />}>
        <Route
          path="/versus-com"
          element={
            <ProtectedRoute>
              <GameVersusCom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-room"
          element={
            <ProtectedRoute>
              <CreateRoom />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
