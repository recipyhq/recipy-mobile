export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_CONFIRMATION = 'CHANGE_PASSWORD_CONFIRMATION';

export const SignInUser = user => ({
  type: SIGN_IN_USER,
  email: user.email,
  password: user.password,
});

export const SignUpUser = user => ({
  type: SIGN_UP_USER,
  email: user.email,
  password: user.password,
  password_confirmation: user.password_confirmation,
});

export const RequestResetPassword = user => ({
  type: REQUEST_RESET_PASSWORD,
  email: user.email,
});

export const ChangeEmail = email => ({
  type: CHANGE_EMAIL,
  email,
});

export const ChangePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});

export const ChangePasswordConfirmation = passwordConfirmation => ({
  type: CHANGE_PASSWORD_CONFIRMATION,
  password_confirmation: passwordConfirmation,
});
