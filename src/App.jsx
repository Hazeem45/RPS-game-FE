import "./assets/GlobalStyle.css";
import "./components/elements/style.css";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GameLayout from "./layouts/gameLayout/GameLayout";
import GameVersusCom from "./pages/GameVersusCom";
import CreateRoom from "./pages/CreateRoom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
      <Route element={<GameLayout />}>
        <Route path="/versus-com" element={<GameVersusCom />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Route>
    </Routes>
  );
}

export default App;
