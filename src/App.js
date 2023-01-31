import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/loginPage";
import { indexURL, VTrackURL, dashboardURL } from "./routes/routes";
import { VTrack } from "./pages/vTrack/VTrack";
import "./common/fonts/Montserrat/static/Montserrat-Regular.ttf";
import "./common/fonts/Montserrat/static/Montserrat-Bold.ttf";
import "./common/fonts/Montserrat/static/Montserrat-Light.ttf";
import "./common/fonts/Montserrat/static/Montserrat-Thin.ttf";
import "./common/fonts/Montserrat/static/Montserrat-Medium.ttf";
import "./common/fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import { useWindowSize } from "./common/hooks";
import {Settings} from "./components/Settings/settings";
import { checkMsalExpiration } from "./config/authConfig";
import { useEffect } from "react";
import { Dashboard } from "./pages/Dashboard/dashboard";

function App() {
  
  useWindowSize();

  useEffect(() => {
    checkMsalExpiration();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={VTrackURL + "/:moduleName"} element={<VTrack />}></Route>
        <Route path={VTrackURL} element={<VTrack />}></Route>
        <Route path={dashboardURL} element={<Dashboard/>}></Route>
        <Route path={indexURL} element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
