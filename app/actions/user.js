import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export const CHANGE_LAST_NAME = 'CHANGE_LAST_NAME';
export const CHANGE_FIRST_NAME = 'CHANGE_FIRST_NAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_CONFIRMATION = 'CHANGE_PASSWORD_CONFIRMATION';
export const CHANGE_CURRENT_PASSWORD = 'CHANGE_CURRENT_PASSWORD';

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

// GET CURRENT USER
export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

export const GET_USER_PROFILE_REQUEST = 'GET_USER_PROFILE_REQUEST';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FAILURE = 'GET_USER_PROFILE_FAILURE';

// SIGN_OUT
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export const signInUserRequest = () => ({
  type: SIGN_IN_USER_REQUEST,
});

export const refreshAuthCredentials = (headers) => {
  if (headers['access-token'] !== undefined && headers['access-token'] !== '') {
    SecureStore.setItemAsync('access-token', headers['access-token']);
  }
  if (headers.client !== undefined && headers.client !== '') {
    SecureStore.setItemAsync('client', headers.client);
  }
  if (headers.uid !== undefined && headers.uid !== '') {
    SecureStore.setItemAsync('uid', headers.uid);
  }
};

export const signInUserSuccess = (response) => {
  refreshAuthCredentials(response.headers);
  SecureStore.setItemAsync('userId', response.data.data.id.toString());
  return ({
    currentUser: response.data.data,
    type: SIGN_IN_USER_SUCCESS,
  });
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
    response.data.errors.full_messages[0],
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

export const editUserSuccess = (response, errorManager) => {
  const tmp = errorManager;
  tmp.email = '';
  tmp.password = '';
  tmp.password_confirmation = '';
  tmp.current_password = '';
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

export const editUserFailure = (error, errorManager) => {
  if (error.response) {
    refreshAuthCredentials(error.response.headers);
    if (error.response.data && error.response.data.errors) {
      const errorData = error.response.data.errors;
      const newErrMa = errorManager;
      newErrMa.email = (errorData.email !== undefined) ? errorData.email[0] : '';
      newErrMa.password = (errorData.password !== undefined) ? errorData.password[0] : '';
      newErrMa.password_confirmation = (errorData.password_confirmation !== undefined) ? errorData.password_confirmation[0] : '';
      newErrMa.current_password = (errorData.current_password !== undefined) ? errorData.current_password[0] : '';
    }
  } else {
    Alert.alert(
      'Edition du profil',
      'Une erreur s\'est produite pendant la tentative d\'édition du profil',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }
  return ({ type: EDIT_USER_FAILURE });
};

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  email,
});

export const changeFirstName = firstName => ({
  type: CHANGE_FIRST_NAME,
  first_name: firstName,
});

export const changeLastName = lastName => ({
  type: CHANGE_LAST_NAME,
  last_name: lastName,
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

export const SignOutUser = (navigation) => {
  SecureStore.deleteItemAsync('userId').then(() => {
    SecureStore.deleteItemAsync('access-token').then(() => {
      SecureStore.deleteItemAsync('client').then(() => {
        SecureStore.deleteItemAsync('uid').then(() => {
          navigation.navigate('Cooker');
        });
      });
    });
  });
  return {
    type: SIGN_OUT_USER,
  };
};

export const GetCurrentUserRequest = () => ({
  type: GET_CURRENT_USER_REQUEST,
});

export const GetCurrentUserSuccess = (response) => {
  const currentUser = response.data.data;
  return {
    type: GET_CURRENT_USER_SUCCESS,
    currentUser,
  };
};

export const GetCurrentUserFailure = () => ({
  type: GET_CURRENT_USER_FAILURE,
});

export const GetUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST,
});

export const GetUserProfileSuccess = response => ({
  type: GET_USER_PROFILE_SUCCESS,
  currentUserProfile: response.data.data,
});

export const GetUserProfileFailure = () => ({
  type: GET_USER_PROFILE_FAILURE,
});
