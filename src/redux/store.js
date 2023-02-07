import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { Namespaces } from './namespaces';
import { rootReducer } from './reducers';
import { getCurrentLocale, setCurrentLocale } from '../common/utils/local-storage';
import { rootSaga } from '../saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [ sagaMiddleware, routerMiddleware(history) ];
const middlewareEnhancer = applyMiddleware(...middlewares);

const persistedState = { [Namespaces.LOCALE]: { locale: getCurrentLocale() || 'en-US' } };

export const store =  createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(middlewareEnhancer)
);

store.subscribe(() => {
  setCurrentLocale(store.getState().LOCALE.locale);
});

sagaMiddleware.run(rootSaga);
