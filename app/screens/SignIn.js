import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ContainerAuthentication from '../components/ContainerAuthentication/ContainerAuthentication';
import InputWithLabelAndIcon from '../components/TextInputs/InputWithLabelAndIcon';
import HomeButton from '../components/Buttons/HomeButton';
import { SignInUser, ChangeEmail, ChangePassword } from '../actions/user';

class SignIn extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
    };
  }

  handlePressSend() {
    const { dispatch } = this.props;
    dispatch(SignInUser());
  }

  handleEmailChange(email) {
    const { dispatch } = this.props;
    dispatch(ChangeEmail(email));
  }

  handlePasswordChange(password) {
    const { dispatch } = this.props;
    dispatch(ChangePassword(password));
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <InputWithLabelAndIcon label="Courriel" iconName="envelope" onChangeText={(text) => { this.handleEmailChange(text); }} keyboardType="email-address" />
        <InputWithLabelAndIcon label="Mot de passe" iconName="key" onChangeText={(text) => { this.handlePasswordChange(text); }} secureTextEntry />
        <HomeButton text="Envoyer" onPress={() => this.handlePressSend()} />
      </ContainerAuthentication>
    );
  }
}

export default connect()(SignIn);
