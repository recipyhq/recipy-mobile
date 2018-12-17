import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import InputWithLabelAndIcon from '../../components/Inputs/InputWithLabelAndIcon';
import { changeEmail } from '../../actions/user';
import ContainerView from '../../components/ContainerView/ContainerView';
import ButtonStd from '../../components/Buttons/ButtonStd';
import BackgroundImage from '../../components/Backgrounds/BackgroundImage/BackgroundImage';
import colors from '../../config/colors';
import styles from './styles';
import { resetPassword } from '../../api/user';
import Loader from '../../components/Loaders/Loader/Loader';

const backgroundImage = require('../../../assets/bg-auth.jpg');

class ForgottenPassword extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      isLoading: PropTypes.bool,
    };
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressBack() {
    const { navigation } = this.props;
    navigation.navigate('HomeAuth');
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
        <BackgroundImage image={backgroundImage}>
          <Loader isLoading={this.isLoading} />
          <ButtonStd
            onPress={() => (this.handlePressBack())}
            title="Retour"
            leftIcon={{
              name: 'arrow-left',
              color: colors.primaryWhite,
              size: 15,
              type: 'font-awesome',
            }}
            buttonStyle={styles.btnBack}
            transparent
            color={colors.primaryWhite}
            fontSize={20}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <InputWithLabelAndIcon label="Courriel" iconName="envelope" onChangeText={(text) => { this.handleEmailChange(text); }} keyboardType="email-address" />
          </View>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
              <ButtonStd
                title="Se connecter"
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
        </BackgroundImage>
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
