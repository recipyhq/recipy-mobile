import axios from 'axios';
import { SecureStore } from 'expo';
import { Alert } from 'react-native';
import ApiUrl from '../config/api';

export function* signInUser(action) {
  const requestUrl = `${ApiUrl}/fr/api/users/sign_in`;
  const body = {
    email: action.email,
    password: action.password,
  };

  yield axios({
    method: 'post',
    url: requestUrl,
    data: body,
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then((response) => {
    SecureStore.setItemAsync('access-token', response.headers['access-token']);
    const { data } = response.data;
    Alert.alert(
      'Connexion réussie',
      `Vous êtes correctement connecté ${data.email}`,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }).catch((error) => {
    error.response.data.errors.forEach((e) => {
      Alert.alert(
        'Erreur',
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
  });
}

export function* requestResetPassword(action) {
  const requestUrl = `${ApiUrl}/fr/api/users/password`;
  const body = {
    email: action.email,
    redirect_url: ApiUrl,
  };

  yield axios({
    method: 'post',
    url: requestUrl,
    data: body,
    config: { headers: { 'Content-Type': 'application/json' } },
  }).then((response) => {
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
  }).catch((error) => {
    if (error.response.data.errors !== undefined) {
      const { errors } = error.response.data;
      errors.forEach((e) => {
        Alert.alert(
          'Erreur',
          e,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      });
    } else {
      Alert.alert(
        'Erreur',
        'Une erreur inconnue s\'est produite',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  });
}
