import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/loginPage";
import Sidebar from "./components/Sidebar/Sidebar";
import { dashboardURL, indexURL } from "./routes/routes";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={dashboardURL} element={<Dashboard />}></Route>
        <Route path={indexURL} element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
