import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import ContainerAuthentication from '../components/ContainerAuthentication/ContainerAuthentication';
import Logo from '../components/Logo/Logo';
import HomeButton from '../components/Buttons/HomeButton';
import ButtonLink from '../components/Buttons/ButtonLink';

class Home extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
    };
  }

  handlePressSignUp() {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  }

  handlePressSignIn() {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
  }

  handlePressForgottenPassword() {
    const { navigation } = this.props;
    navigation.navigate('ForgottenPassword');
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <Logo />
        <HomeButton text="Se connecter" onPress={() => this.handlePressSignIn()} />
        <HomeButton text="S'enregistrer" onPress={() => this.handlePressSignUp()} />
        <ButtonLink text="Mot de passe oublié ?" onPress={() => this.handlePressForgottenPassword()} />
      </ContainerAuthentication>
    );
  }
}

export default connect()(Home);
