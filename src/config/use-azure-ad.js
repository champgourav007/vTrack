import { useMsal } from "@azure/msal-react";
import { loginRequest, logoutRequest } from "./authConfig";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem, setLocalStorageItem } from "../common/utils/local-storage";
import { ACCESS_TOKEN, ACCOUNT, EXPIRES_ON, TIME_OF_AUTO_LOGOUT } from "../common/constants/local-storage-keys";
import { dashboardURL } from "../routes/routes";

export const useAzureADAuth = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const loginAzureADPopup = useCallback(() => {
    instance
      .loginPopup(loginRequest)
      .then((e) => {
        console.log(e);
        setLocalStorageItem(ACCESS_TOKEN, e.accessToken);
        sessionStorage.setItem("userInformation", JSON.stringify(e));
        navigate(dashboardURL);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [instance]);

  const logoutAzureAD = useCallback(() => {
    removeLocalStorageItem(ACCESS_TOKEN);
    removeLocalStorageItem(ACCOUNT);
    removeLocalStorageItem(EXPIRES_ON);
    removeLocalStorageItem(TIME_OF_AUTO_LOGOUT);
    instance
      .logoutPopup(logoutRequest)
      .then(() => {
        navigate("/");
        console.log("logout successful");
        sessionStorage.removeItem("userInformation");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [instance]);

  return {
    loginAzureADPopup,
    logoutAzureAD,
  };
};
