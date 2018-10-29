import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import ContainerAuthentication from '../components/ContainerAuthentication/ContainerAuthentication';
import InputWithLabelAndIcon from '../components/TextInputs/InputWithLabelAndIcon';
import HomeButton from '../components/Buttons/HomeButton';
import { ChangeEmail, RequestResetPassword } from '../actions/user';

class ForgottenPassword extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
    };
  }

  handleEmailChange(email) {
    const { dispatch } = this.props;
    dispatch(ChangeEmail(email));
  }

  handlePressSend(user) {
    const { dispatch } = this.props;
    dispatch(RequestResetPassword(user));
  }

  render() {
    return (
      <ContainerAuthentication>
        <StatusBar translucent={false} barStyle="light-content" />
        <InputWithLabelAndIcon label="Courriel" iconName="envelope" onChangeText={(text) => { this.handleEmailChange(text); }} keyboardType="email-address" />
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
  },
});

export default connect(mapStateToProps)(ForgottenPassword);
