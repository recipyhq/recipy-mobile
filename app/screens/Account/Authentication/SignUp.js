import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import connect from 'react-redux/es/connect/connect';
import { PropTypes } from 'prop-types';
import { Input } from 'react-native-elements';
import ContainerView from '../../../components/ContainerView/ContainerView';
import {
  changeEmail, changeFirstName, changeLastName, changePassword, changePasswordConfirmation,
} from '../../../actions/user';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import colors from '../../../config/colors';
import styles from './styles';
import { signUpUser } from '../../../api/user';
import Logo from '../../../components/Logo/Logo';
import Loader from '../../../components/Loaders/Loader/Loader';

const imageSize = Dimensions.get('window').width / 4;

class SignUp extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
      isLoading: PropTypes.bool,
    };
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressSend(user) {
    const { dispatch, navigation } = this.props;
    signUpUser(dispatch, user, navigation);
  }

  handleChangeEmail(email) {
    const { dispatch } = this.props;
    dispatch(changeEmail(email));
  }

  handleChangeFirstName(firstName) {
    const { dispatch } = this.props;
    dispatch(changeFirstName(firstName));
  }

  handleChangeLastName(lastName) {
    const { dispatch } = this.props;
    dispatch(changeLastName(lastName));
  }

  handleChangePassword(password) {
    const { dispatch } = this.props;
    dispatch(changePassword(password));
  }

  handleChangePasswordConfirmation(passwordConfirmation) {
    const { dispatch } = this.props;
    dispatch(changePasswordConfirmation(passwordConfirmation));
  }

  render() {
    return (
      <ContainerView>
        <Loader isLoading={this.isLoading} />
        <View style={styles.container}>
          <Logo style={styles.logo} width={imageSize} height={imageSize} />
          <Text style={styles.welcome}>
            BIENVENUE
          </Text>
          <Text style={styles.title}>
            Je suis ravi de faire votre connaissance !
          </Text>

          <Input label="Prénom" onChangeText={(text) => { this.handleChangeFirstName(text); }} />
          <Input label="Nom" onChangeText={(text) => { this.handleChangeLastName(text); }} />
          <Input label="Courriel" onChangeText={(text) => { this.handleChangeEmail(text); }} keyboardType="email-address" />
          <Input label="Mot de passe" onChangeText={(text) => { this.handleChangePassword(text); }} secureTextEntry />
          <Input label="Confirmation de mot de passe" onChangeText={(text) => { this.handleChangePasswordConfirmation(text); }} secureTextEntry />
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <ButtonStd
                title="Créer mon compte"
                onPress={() => {
                  const { user } = this.props;
                  this.handlePressSend(user);
                }}
                buttonStyle={styles.btnSendForm}
                borderRadius={30}
                fontSize={20}
                color={colors.primaryWhite}
              />
            </View>
          </View>
        </View>
      </ContainerView>
    );
  }
}

SignUp.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  user: {
    email: state.user.email,
    password: state.user.password,
    password_confirmation: state.user.password_confirmation,
    accountType: state.user.accountType,
    first_name: state.user.first_name,
    last_name: state.user.last_name,
  },
});

export default connect(mapStateToProps)(SignUp);
