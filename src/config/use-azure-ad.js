import { useMsal } from '@azure/msal-react';
import { loginRequest } from "./authConfig";
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAzureADAuth = () => {
  const { instance } = useMsal();
  // const navigate = useNavigate();

  const loginAzureADPopup = useCallback(() => {
    instance.loginPopup(loginRequest).then(() => {
      // navigate('/dashboard');
    }).catch((e) => {
      console.log(e);
    });
  }, [ instance ]);

  return {
    loginAzureADPopup
  };
};