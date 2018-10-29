import { all, takeEvery } from 'redux-saga/effects';
import { SIGN_IN_USER, REQUEST_RESET_PASSWORD } from '../actions/user';
import { requestResetPassword, signInUser } from '../api/user';

export function* watchSignInUser() {
  yield takeEvery(SIGN_IN_USER, signInUser);
}
export function* watchForgottenPassword() {
  yield takeEvery(REQUEST_RESET_PASSWORD, requestResetPassword);
}

function* rootSaga() {
  yield all([
    watchSignInUser(),
    watchForgottenPassword(),
  ]);
}

export default rootSaga;
