import React, { Component } from 'react';
import { Text, Dimensions, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import ContainerView from '../../../components/ContainerView/ContainerView';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import colors from '../../../config/colors';
import styles from './styles';
import { changeEmail, changePassword } from '../../../actions/user';
import Loader from '../../../components/Loaders/Loader/Loader';
import { signInUser } from '../../../api/user';
import Logo from '../../../components/Logo/Logo';

const imageSize = Dimensions.get('window').width / 4;

class SignIn extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleChangeEmail(email) {
    const { dispatch } = this.props;
    dispatch(changeEmail(email));
  }

  handleChangePassword(password) {
    const { dispatch } = this.props;
    dispatch(changePassword(password));
  }

  handlePressSend(user) {
    const { dispatch, navigation } = this.props;
    signInUser(dispatch, navigation, user);
  }

  render() {
    return (
      <ContainerView>
        <Loader isLoading={this.isLoading} />
        <View style={styles.container}>
          <Logo style={styles.logo} width={imageSize} height={imageSize} />
          <Text style={styles.welcome}>BIENVENUE</Text>
          <Text style={styles.title}>
            Je suis heureux de vous retrouver
          </Text>
          <Input label="Courriel" onChangeText={(text) => { this.handleChangeEmail(text); }} keyboardType="email-address" />
          <Input label="Mot de passe" onChangeText={(text) => { this.handleChangePassword(text); }} secureTextEntry />
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

SignIn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

SignIn.defaultProps = {
  isLoading: false,
};

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email,
      password: state.user.password,
    },
    isLoading: state.user.isLoading,
  };
}

export default connect(mapStateToProps)(SignIn);
