import { useMsal } from "@azure/msal-react";
import { veersaLogo } from "../../common/icons";
import { loginRequest } from "../../config/authConfig";
import "./loginPage.css";

function LoginPage() {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    console.log(process.env.REACT_APP_CLIENT_ID);
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    }
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
        <button className="loginBtn" onClick={() => handleLogin("popup")}>Log in</button>
      </div>
    </div>
  );
}

export default LoginPage;
