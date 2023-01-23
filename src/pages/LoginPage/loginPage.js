import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { veersaLogo } from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import { VTrackURL } from "../../routes/routes";
import "./loginPage.css";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const LoginPage = () => {
  const { loginAzureADPopup } = useAzureADAuth();
  const navigate = useNavigate()

  const handleLogin = () => {
    loginAzureADPopup();
  };

  useEffect(() => {
    const accessToken = cookies.get('userInformation');
    // let User = localStorage.getItem("userInformation");
    if (accessToken) navigate(VTrackURL);
  }, []);

  return (
    <div className="loginPage">
      <div className="leftDiv">
        <div className="leftDivText">
          <div className="mainHeading">
            Welcome to
            <br />
            vTrack
          </div>
          <div className="subHeading1">
            One stop shop for project
            <br />
            management
          </div>
        </div>
      </div>
      <div className="rightDiv">
        <img src={veersaLogo} alt="" className="login-logo" />
        <button className="loginBtn" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
