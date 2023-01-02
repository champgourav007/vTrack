import { ACCESS_TOKEN, ACCOUNT, EXPIRES_ON, TIME_OF_AUTO_LOGOUT } from "../common/constants/local-storage-keys";
import { getLocalStorageItem, removeLocalStorageItem } from "../common/utils/local-storage";

let expirationTimeoutId;

export function setExpirationTimeout (
  instance,
  request,
  expiresOnString
) {
  if (expirationTimeoutId) {
    clearTimeout(expirationTimeoutId);
  }

  const TOKEN_SPARETIME_COEFFICIENT = 0.75;
  const tokenLifeTime = TOKEN_SPARETIME_COEFFICIENT * (+(new Date(expiresOnString)) - Date.now());
  if (tokenLifeTime <= 0) {
    removeLocalStorageItem(ACCESS_TOKEN);
    removeLocalStorageItem(ACCOUNT);
    removeLocalStorageItem(EXPIRES_ON);
    removeLocalStorageItem(TIME_OF_AUTO_LOGOUT);
    instance.loginRedirect(request)
      .catch((error) => {
        console.error(error);
        window.location.reload(true);
      });
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
