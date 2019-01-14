import * as SecureStore from 'expo/src/SecureStore';
import { Alert } from 'react-native';

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_CONFIRMATION = 'CHANGE_PASSWORD_CONFIRMATION';
export const CHANGE_CURRENT_PASSWORD = 'CHANGE_CURRENT_PASSWORD';
export const CHANGE_ACCOUNT_TYPE = 'CHANGE_ACCOUNT_TYPE';

// SIGN_IN_USER
export const SIGN_IN_USER_REQUEST = 'SIGN_IN_USER_REQUEST';
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS';
export const SIGN_IN_USER_FAILURE = 'SIGN_IN_USER_FAILURE';

// SIGN_UP_USER
export const SIGN_UP_USER_REQUEST = 'SIGN_UP_USER_REQUEST';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
export const SIGN_UP_USER_FAILURE = 'SIGN_UP_USER_FAILURE';

// RESERT_PASSWORD
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

// EDIT_USER
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const signInUserRequest = () => ({
  type: SIGN_IN_USER_REQUEST,
});

export const refreshAuthCredentials = (headers) => {
  // console.log('************ REFRESH CREDENTIALS ************');
  if (headers['access-token'] !== undefined) {
    SecureStore.setItemAsync('access-token', headers['access-token']);
    // console.log('access-token', headers['access-token']);
  }
  if (headers.client !== undefined) {
    SecureStore.setItemAsync('client', headers.client);
    // console.log('client', headers.client);
  }
  if (headers.uid !== undefined) {
    SecureStore.setItemAsync('uid', headers.uid);
    // console.log('uid', headers.uid);
  }
};

export const signInUserSuccess = (response, navigation) => {
  refreshAuthCredentials(response.headers);
  // Redirect to the Cooker home
  navigation.navigate('Cooker');
  return ({ type: SIGN_IN_USER_SUCCESS });
};

export const signInUserFailure = () => {
  Alert.alert(
    'Connexion échouée',
    'Une erreur s\'est produite pendant la tentative de connexion',
    [
      {
        text: 'OK',
        onPress: () => {
        },
      },
    ],
    { cancelable: false },
  );
  return ({ type: SIGN_IN_USER_FAILURE });
};

export const signUpUserRequest = () => ({
  type: SIGN_UP_USER_REQUEST,
});

export const signUpUserSuccess = () => {
  Alert.alert(
    'Inscription réussie',
    'Veuillez confirmer votre compte en cliquant sur le lien '
    + 'qui vient de vous être adressé par courriel',
    [
      {
        text: 'OK',
      },
    ],
    { cancelable: false },
  );
  return ({
    type: SIGN_UP_USER_SUCCESS,
  });
};

export const signUpUserFailure = (error) => {
  refreshAuthCredentials(error.response.headers);
  const { response } = error;
  Alert.alert(
    'Inscription échouée',
    response.statusText,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: SIGN_UP_USER_FAILURE });
};

export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  const { success, message } = response.data;
  if (success) {
    Alert.alert(
      'Réinitialisation du mot de passe',
      message,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  } else {
    Alert.alert(
      'Réinitialisation du mot de passe',
      'Une erreur inconnue s\'est produite',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }
  return ({
    type: RESET_PASSWORD_SUCCESS,
  });
};

export const resetPasswordFailure = (error) => {
  refreshAuthCredentials(error.response.headers);
  if (error.response.data.errors !== undefined) {
    const { errors } = error.response.data;
    errors.forEach((e) => {
      Alert.alert(
        'Réinitialisation du mot de passe',
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
  } else {
    Alert.alert(
      'Réinitialisation du mot de passe',
      'Une erreur inconnue s\'est produite',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }
  return ({ type: RESET_PASSWORD_FAILURE });
};

export const editUserRequest = () => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  Alert.alert(
    'Edition du profil',
    'Votre compte a correctement été mis à jour',
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({
    type: EDIT_USER_SUCCESS,
  });
};

export const editUserFailure = (error) => {
  refreshAuthCredentials(error.response.headers);
  Alert.alert(
    'Edition du profil',
    'Une erreur inconnue s\'est produite',
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
  return ({ type: EDIT_USER_FAILURE });
};

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  email,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});

export const changePasswordConfirmation = passwordConfirmation => ({
  type: CHANGE_PASSWORD_CONFIRMATION,
  password_confirmation: passwordConfirmation,
});

export const changeCurrentPassword = currentPassword => ({
  type: CHANGE_CURRENT_PASSWORD,
  current_password: currentPassword,
});

export const changeAccountType = type => ({
  type: CHANGE_ACCOUNT_TYPE,
  accountType: type,
});
