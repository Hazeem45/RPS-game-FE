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
import {SidebarProvider} from "./utils/SidebarContext";
import GameVersusPlayer from "./pages/GameVersusPlayer";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <Dashboard />
            </SidebarProvider>
          </ProtectedRoute>
        }
      />
      <Route element={<GameLayout />}>
        <Route path="/versus-com" element={<GameVersusCom />} />
        <Route
          path="/create-room"
          element={
            <ProtectedRoute>
              <CreateRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/versus-player"
          element={
            <ProtectedRoute>
              <GameVersusPlayer />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <center>
            <h1>404 Page Not Found</h1>
          </center>
        }
      />
    </Routes>
  );
}

export default App;
