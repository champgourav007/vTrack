import { call, put, takeLatest } from "redux-saga/effects";
import { getListItems } from "../http/requests/dropdown";
import {
  DropdownType,
  setListItems,
  setVtrackLoader
} from "../redux/actions";

function* workerListItemsSaga() {
  try {
    yield put(setVtrackLoader(true));
    const currency = yield call(getListItems, 'currency');
    const location = yield call(getListItems, 'clientLocation');
    const type = yield call(getListItems, 'projectType');
    const status = yield call(getListItems, 'projectStatus');
    let listItems = {
      'currency': currency,
      'location': location,
      'type': type,
      'status': status
    };
    yield put(setListItems(listItems));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* listItemsSaga() {
  yield takeLatest(
    DropdownType.GET_LIST_ITEMS,
    workerListItemsSaga
  );
};
