import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import connect from 'react-redux/es/connect/connect';
import { PropTypes } from 'prop-types';
import ContainerAuthentication from '../components/ContainerAuthentication/ContainerAuthentication';
import InputWithLabelAndIcon from '../components/TextInputs/InputWithLabelAndIcon';
import HomeButton from '../components/Buttons/HomeButton';
import {
  ChangeEmail, ChangePassword, ChangePasswordConfirmation,
} from '../actions/user';


class SignUp extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
    };
  }

  handlePressSend() {
    this.ign = 1;
  }

  handleChangeEmail(email) {
    const { dispatch } = this.props;
    dispatch(ChangeEmail(email));
  }

  handleChangePassword(password) {
    const { dispatch } = this.props;
    dispatch(ChangePassword(password));
  }

  handleChangePasswordConfirmation(passwordConfirmation) {
    const { dispatch } = this.props;
    dispatch(ChangePasswordConfirmation(passwordConfirmation));
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <InputWithLabelAndIcon label="Courriel" iconName="envelope" onChangeText={(text) => { this.handleChangeEmail(text); }} keyboardType="email-address" />
        <InputWithLabelAndIcon label="Mot de passe" iconName="key" onChangeText={(text) => { this.handleChangePassword(text); }} secureTextEntry />
        <InputWithLabelAndIcon label="Confirmation de mot de passe" iconName="key" onChangeText={(text) => { this.handleChangePasswordConfirmation(text); }} secureTextEntry />
        <HomeButton text="Envoyer" onPress={() => this.handlePressSend()} />
      </ContainerAuthentication>
    );
  }
}

export default connect()(SignUp);
