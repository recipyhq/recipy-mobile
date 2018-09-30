export const SIGN_IN_USER = 'SIGN_IN_USER';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_CONFIRMATION = 'CHANGE_PASSWORD';

export const SignInUser = () => ({
  type: SIGN_IN_USER,
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
  passwordConfirmation,
});
