import createReducer from 'Utils/createReducer';

import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import { createSelector } from 'reselect';

import { typeCreator } from 'Utils/actionCreator';

// Action types
// use AsyncType to define single 
const ns = 'TST';

const types = {
  ...typeCreator(['SYNC'], ns, false),
  ...typeCreator(['ASYNC'], ns, true)
};
console.log(types);

// Actions
const actions = {
  asyncTest: (payload) => ({ type , payload} )
};

//States
const initialState = {
  foo: 'bar',
};

// Reducer
export const testReducer = (state = initialState, { type }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.TEST:
        draft.foo = 'baz';
        draft.loading = false;
        draft.errors = false;
        break;
    }
  });

//Sagas
function* sagass({ payload }) {

}

export function* testSaga() {
  yield takeLatest(types.ASYNC, sagass);
}

// Selectors
export const selectTest = (state) => state.test;
export const selectRouter = (state) => state.router;
export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.location
  );

export const makeSelectFoo = () =>
  createSelector(
    selectTest,
    (testState) => testState.foo
  );
