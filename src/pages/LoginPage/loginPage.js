import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { veersaLogo } from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import { dashboardURL } from "../../routes/routes";
import "./loginPage.css";
import { dashboardImage } from "../../common/icons";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const LoginPage = () => {
  const { loginAzureADPopup } = useAzureADAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginAzureADPopup();
  };
  
  useEffect(() => {
    document.title = "Veersa Portal";
  }, [])

  useEffect(() => {
    const accessToken = cookies.get('userInformation');
    if (accessToken) navigate(dashboardURL);
  }, []);

  return (
    <div className="loginPage">
      <div className="leftDiv">
        <div className="leftDivText">
          <img src={veersaLogo} alt="" className="login-logo" />
          <button className="loginBtn" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
      </div>
      <div className="rightDiv">
        <div className="mainHeading">
          Welcome back
          <br />
        </div>
        <div className="subHeading1">Nice to see you again</div>
        <img src={dashboardImage} alt="" className="dashboard-image" />       
        </div>
    </div>
  );
};

export default LoginPage;
