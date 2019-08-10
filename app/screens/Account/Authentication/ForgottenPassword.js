import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Input } from 'react-native-elements';
import { changeEmail } from '../../../actions/user';
import ContainerView from '../../../components/ContainerView/ContainerView';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import colors from '../../../config/colors';
import styles from './styles';
import { resetPassword } from '../../../api/user';
import Logo from '../../../components/Logo/Logo';
import Loader from '../../../components/Loaders/Loader/Loader';

const imageSize = Dimensions.get('window').width / 4;

class ForgottenPassword extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool,
    };
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleEmailChange(email) {
    const { dispatch } = this.props;
    dispatch(changeEmail(email));
  }

  handlePressSend(user) {
    const { dispatch } = this.props;
    resetPassword(dispatch, user);
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
            Vous avez oubliez votre mot de passe ?
          </Text>
          <Input label="Courriel" onChangeText={(text) => { this.handleEmailChange(text); }} keyboardType="email-address" />
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <ButtonStd
                title="Réinitialiser le mot de passe"
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

ForgottenPassword.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  user: {
    email: state.user.email,
  },
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(ForgottenPassword);
