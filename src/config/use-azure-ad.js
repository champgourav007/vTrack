import { useMsal } from '@azure/msal-react';
import { loginRequest, logoutRequest } from "./authConfig";
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAzureADAuth = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const loginAzureADPopup = useCallback(() => {
    instance.loginPopup(loginRequest).then((e) => {
      console.log(e);
      sessionStorage.setItem('userInformation', JSON.stringify(e));
      navigate('/dashboard');
    }).catch((e) => {
      console.log(e);
    });
  }, [ instance ]);

  const logoutAzureAD = useCallback(() => {
    instance.logoutPopup(logoutRequest).then(() => {
      navigate('/');
      console.log('logout successful');
      sessionStorage.removeItem('userInformation');
    }).catch((e) => {
      console.log(e);
    })
  }, [ instance ]);

  return {
    loginAzureADPopup,
    logoutAzureAD
  };
};