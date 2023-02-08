import {
  PublicClientApplication, EventType
} from '@azure/msal-browser';
import { ACCESS_TOKEN, ACCOUNT, EXPIRES_ON, TIME_OF_AUTO_LOGOUT } from '../common/constants/local-storage-keys';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../common/utils/local-storage';
import { setExpirationTimeout } from './msal-expiration';
import Cookies from 'universal-cookie';

let USE_SILENT_MODE = false;

function abandonSilentMode() {
  console.log('MSAL back to NOT silent SSO'); // TODO: remove after tests
  USE_SILENT_MODE = false;
}

function resetSilentMode() {
  USE_SILENT_MODE = (window?.env?.SSO_SILENT_LOGIN_ACTIVE || '').toLowerCase() === 'true';
}

resetSilentMode();

export function msalUseSilentMode() {
  return USE_SILENT_MODE;
}
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_AUTHORITY_URL,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  scopes: [process.env.REACT_APP_SCOPES],
};

export const logoutRequest = (instance) => {
  const userInfo = JSON.parse(localStorage.getItem('userInformation'));
  const homeAccountId = userInfo.account.homeAccountId;
  return {     
    account: instance.getAccountByHomeId(homeAccountId),     
    mainWindowRedirectUri: "https://localhost:3000",     
    postLogoutRedirectUri: "https://localhost:3000",   
  }
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me",
};

export const msalClient = new PublicClientApplication(msalConfig);

msalClient.addEventCallback((message) => {
  const { eventType, payload } = message;
  const cookies = new Cookies();
  
  const successEvents = [
    EventType.ACQUIRE_TOKEN_SUCCESS,
    EventType.LOGIN_SUCCESS,
    EventType.SSO_SILENT_SUCCESS,
  ];
  if (successEvents.includes(eventType)) {
    const data = payload;
    if (data && data.account) {
      resetSilentMode();
      const expiresOnFromResponse = String(data.expiresOn);
      setLocalStorageItem(ACCESS_TOKEN, data.accessToken);
      sessionStorage.setItem('userInformation', data);
      cookies.set('userInformation', data.accessToken, { path: '/'});
      setLocalStorageItem(ACCOUNT, JSON.stringify(data.account));
      setLocalStorageItem(EXPIRES_ON, expiresOnFromResponse);
      setExpirationTimeout(msalClient, loginRequest, expiresOnFromResponse);
    }
  }

  if (eventType === EventType.SSO_SILENT_FAILURE) {
    // There is also can be not only InteractionRequiredAuthError but another type of error
    // after which is better to switch to normal flow
    abandonSilentMode();
  }
  
  if(eventType === Event.INITIALIZE_START){
    removeLocalStorageItem(ACCESS_TOKEN);
    removeLocalStorageItem(ACCOUNT);
    removeLocalStorageItem(EXPIRES_ON);
    removeLocalStorageItem(TIME_OF_AUTO_LOGOUT);
    removeLocalStorageItem("userInformation");
    cookies.remove('userInformation', {path: "/", sameSite: false });
  }
});

window.addEventListener('storage', ({ key, newValue, oldValue }) =>{
  if (key === ACCESS_TOKEN && !newValue && oldValue) {
    // removing ACCESS_TOKEN from storage means that user logged out from another tab
    // user should be redirected to the auth page
    window.location.reload(true);
  }
});

export function checkMsalExpiration() {
  let expiresOnFromStorage = getLocalStorageItem(EXPIRES_ON);
  expiresOnFromStorage && setExpirationTimeout(msalClient, loginRequest, expiresOnFromStorage);
}
