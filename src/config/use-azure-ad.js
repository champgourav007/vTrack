import { useMsal } from "@azure/msal-react";
import { loginRequest, logoutRequest } from "./authConfig";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem, setLocalStorageItem } from "../common/utils/local-storage";
import { ACCESS_TOKEN, ACCOUNT, EXPIRES_ON, TIME_OF_AUTO_LOGOUT } from "../common/constants/local-storage-keys";
import { VTrackURL } from "../routes/routes";
import Cookies from 'universal-cookie';

export const useAzureADAuth = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const loginAzureADPopup = useCallback(() => {
    instance
      .loginPopup(loginRequest)
      .then((e) => {
        console.log(e);
        setLocalStorageItem(ACCESS_TOKEN, e.accessToken);
        localStorage.setItem("userInformation", JSON.stringify(e));
        cookies.set('userInformation', e.accessToken, { path: '/'});

        navigate(VTrackURL);
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
        cookies.remove('userInformation', {path: "/", sameSite: false });
        localStorage.removeItem("userInformation");
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
