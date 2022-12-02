import "./Login.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

function Login() {
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
    <>
      <span className="Login">
        <span className="left"></span>
        <div className="right">
          <button onClick={() => handleLogin("popup")}>Login</button>
        </div>
      </span>
    </>
  );
}

export default Login;
