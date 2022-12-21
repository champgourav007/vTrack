import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { Namespaces } from '../namespaces';
import { appStateReducer } from './app-state';
import { modulesReducer } from './modules';
import { localeReducer } from './locale';
import { uiReducer } from './ui';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  [Namespaces.ROUTER]: connectRouter(createBrowserHistory()),
  [Namespaces.LOCALE]: localeReducer,
  [Namespaces.MODULES]: modulesReducer,
  [Namespaces.USER]: userReducer,
  [Namespaces.UI]: uiReducer,
  [Namespaces.APP_STATE]: appStateReducer
});
