import Cookies from "universal-cookie";
import { ACCESS_TOKEN, ACCOUNT, EXPIRES_ON, TIME_OF_AUTO_LOGOUT } from "../common/constants/local-storage-keys";
import { getLocalStorageItem, removeLocalStorageItem } from "../common/utils/local-storage";

let expirationTimeoutId;

export function setExpirationTimeout (
  instance,
  request,
  expiresOnString
  ) {
    const cookies = new Cookies();
    if (expirationTimeoutId) {
      clearTimeout(expirationTimeoutId);
    }

  const TOKEN_SPARETIME_COEFFICIENT = 0.75;
  const tokenLifeTime = TOKEN_SPARETIME_COEFFICIENT * (+(new Date(expiresOnString)) - Date.now());
  if (tokenLifeTime <= 0) {
    localStorage.clear();
    sessionStorage.clear();
    // instance.loginRedirect(request)
    //   .catch((error) => {
    //     console.error(error);
    //     window.location.reload(true);
    //   });
    return;
  }
  expirationTimeoutId = setTimeout(() => {
    instance
      .acquireTokenSilent({
        scopes: request.scopes,
        account: JSON.parse(getLocalStorageItem(ACCOUNT)),
        forceRefresh: true,
      })
      .catch(() =>
        instance.acquireTokenRedirect(request))
      .catch((error) => {
        console.error(error);
        window.location.reload(true);
      });
  }, tokenLifeTime);
}
