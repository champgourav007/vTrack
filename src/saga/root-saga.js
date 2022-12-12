import { all, fork } from 'redux-saga/effects';
import { clientAdminSaga } from './client-admin-saga';
import { userSaga } from './user-saga';

export function* rootSaga() {
  yield all([
    fork(clientAdminSaga),
    fork(userSaga),
  ]);
}
