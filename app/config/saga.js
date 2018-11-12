import { all, takeEvery } from 'redux-saga/effects';
import { SIGN_IN_USER, REQUEST_RESET_PASSWORD, SIGN_UP_USER } from '../actions/user';
import { requestResetPassword, signInUser, signUpUser } from '../api/user';

export function* watchSignInUser() {
  yield takeEvery(SIGN_IN_USER, signInUser);
}
export function* watchForgottenPassword() {
  yield takeEvery(REQUEST_RESET_PASSWORD, requestResetPassword);
}

export function* whatSignUpUser() {
  yield takeEvery(SIGN_UP_USER, signUpUser);
}

function* rootSaga() {
  yield all([
    watchSignInUser(),
    watchForgottenPassword(),
    whatSignUpUser(),
  ]);
}

export default rootSaga;
