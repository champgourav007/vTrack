import { veersaLogo } from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
function LoginPage() {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = (loginType) => {
    console.log(process.env.REACT_APP_CLIENT_ID);
    if (loginType === "popup") {
      instance
        .loginPopup(loginRequest)
        .then((e) => {
          console.log(e);
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e);
        });
    }
=======
export const LoginPage = () => {
  const { loginAzureADPopup } = useAzureADAuth();

  const handleLogin = () => {
    loginAzureADPopup();
>>>>>>> a9c9ea7dfcf48b9e312ac345a65958199616ed57
  };

  return (
    <div className="loginPage">
      <div className="leftDiv">
        <div className="leftDivText">
          <div className="mainHeading">
            Welcome to
            <br />
            VTrack
          </div>
          <div className="subheading1">Nice to see you again</div>
          <div className="subheading2">
            One stop shop for project
            <br />
            management
          </div>
        </div>
      </div>
      <div className="rightDiv">
<<<<<<< HEAD
        <img src={veersaLogo} alt="" />
        <button className="loginBtn" onClick={() => handleLogin("popup")}>
          Log in
        </button>
=======
        <img src={veersaLogo} alt=""/>
        <button className="loginBtn" onClick={() => handleLogin()}>Log in</button>
>>>>>>> a9c9ea7dfcf48b9e312ac345a65958199616ed57
      </div>
    </div>
  );
}

export default LoginPage;
