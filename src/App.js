import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import { indexURL } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={indexURL} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
