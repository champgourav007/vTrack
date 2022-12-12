import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { Namespaces } from '../namespaces';
import { clientAdminReducer } from './client-admin';
import { localeReducer } from './locale';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  [Namespaces.ROUTER]: connectRouter(createBrowserHistory()),
  [Namespaces.LOCALE]: localeReducer,
  [Namespaces.CLIENT_ADMIN]: clientAdminReducer,
  [Namespaces.USER]: userReducer,
});
