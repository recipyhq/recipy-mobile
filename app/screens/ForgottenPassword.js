import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import ContainerAuthentication from '../components/ContainerAuthentication/ContainerAuthentication';
import InputWithLabelAndIcon from '../components/TextInputs/InputWithLabelAndIcon';
import HomeButton from '../components/Buttons/HomeButton';

class ForgottenPassword extends Component {
  handlePressSend() {
    this.ign = 1;
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <InputWithLabelAndIcon label="Courriel" iconName="envelope" />
        <HomeButton text="Envoyer" onPress={() => this.handlePressSend()} />
      </ContainerAuthentication>
    );
  }
}

export default ForgottenPassword;
