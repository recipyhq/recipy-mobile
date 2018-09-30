import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import ContainerAuthentication from '../components/ContainerAuthentication/ContainerAuthentication';
import InputWithLabelAndIcon from '../components/TextInputs/InputWithLabelAndIcon';
import HomeButton from '../components/Buttons/HomeButton';

class SignUp extends Component {
  handlePressSend() {
    this.ign = 1;
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <InputWithLabelAndIcon label="Courriel" iconName="envelope" />
        <InputWithLabelAndIcon label="Mot de passe" iconName="key" />
        <InputWithLabelAndIcon label="Confirmation de mot de passe" iconName="key" />
        <HomeButton text="Envoyer" onPress={() => this.handlePressSend()} />
      </ContainerAuthentication>
    );
  }
}

export default SignUp;
