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
  scopes: ["User.Read"],
};

export const logoutRequest = (instance) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInformation'));
  const homeAccountId = userInfo.account.homeAccountId;
  return {     
    account: instance.getAccountByHomeId(homeAccountId),     
    mainWindowRedirectUri: "your_app_main_window_redirect_uri",     
    postLogoutRedirectUri: "your_app_logout_redirect_uri",   
  }
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me",
};
