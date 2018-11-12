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
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
    };
  }

  handlePressSend(user) {
    const { dispatch } = this.props;
    dispatch(SignInUser(user));
  }

  handleChangeEmail(email) {
    const { dispatch } = this.props;
    dispatch(ChangeEmail(email));
  }

  handleChangePassword(password) {
    const { dispatch } = this.props;
    dispatch(ChangePassword(password));
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <InputWithLabelAndIcon label="Courriel" iconName="envelope" onChangeText={(text) => { this.handleChangeEmail(text); }} keyboardType="email-address" />
        <InputWithLabelAndIcon label="Mot de passe" iconName="key" onChangeText={(text) => { this.handleChangePassword(text); }} secureTextEntry />
        <HomeButton
          text="Envoyer"
          onPress={() => {
            const { user } = this.props;
            this.handlePressSend(user);
          }
        }
        />
      </ContainerAuthentication>
    );
  }
}

const mapStateToProps = state => ({
  user: {
    email: state.user.user.email,
    password: state.user.user.password,
  },
});

export default connect(mapStateToProps)(SignIn);
