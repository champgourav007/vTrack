import { useMsal } from "@azure/msal-react";
import { loginRequest, logoutRequest } from "./authConfig";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorageItem } from "../common/utils/local-storage";
import { ACCESS_TOKEN } from "../common/constants/local-storage-keys";

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
        navigate("/vTrack/ClientAdmin");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [instance]);

  const logoutAzureAD = useCallback(() => {
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
