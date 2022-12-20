import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { veersaLogo } from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import { dashboardURL } from "../../routes/routes";
import "./loginPage.css";

export const LoginPage = () => {
  const { loginAzureADPopup } = useAzureADAuth();
  const navigate = useNavigate()

  const handleLogin = () => {
    loginAzureADPopup();
  };

  useEffect(() => {
    let User = sessionStorage.getItem("userInformation");
    if (User != null) navigate(dashboardURL);
  }, []);

  return (
    <div className="loginPage">
      <div className="leftDiv">
        <div className="leftDivText">
          <div className="mainHeading">
            Welcome to
            <br />
            VTrack
          </div>
          <div className="subHeading1">Nice to see you again</div>
          <div className="subHeading2">
            One stop shop for project
            <br />
            management
          </div>
        </div>
      </div>
      <div className="rightDiv">
        <img src={veersaLogo} alt="" />
        <button className="loginBtn" onClick={() => handleLogin()}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
