import { veersaLogo } from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import "./loginPage.css";

export const LoginPage = () => {
  const { loginAzureADPopup } = useAzureADAuth();

  const handleLogin = () => {
    loginAzureADPopup();
  };

  return (
    <div className="loginPage"> 
      <div className="leftDiv">
        <div className="leftDivText">
          <div className="mainHeading">
            Welcome to<br />VTrack
          </div>
          <div className="subheading1">Nice to see you again</div>
          <div className="subheading2">One stop shop for project<br/>management</div>
        </div>
      </div>
      <div className="rightDiv">
        <img src={veersaLogo} alt=""/>
        <button className="loginBtn" onClick={() => handleLogin()}>Log in</button>
      </div>
    </div>
  );
}

export default LoginPage;
