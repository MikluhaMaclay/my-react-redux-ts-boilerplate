import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'Utils/history';

import { all } from 'redux-saga/effects';

import { testSaga, testReducer } from './modules/test';

const injectedSagas = [
  testSaga()
];

const injectedReducers = {
  test: testReducer
};

export function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}

export function* rootSaga() {
  yield all(injectedSagas);
}
