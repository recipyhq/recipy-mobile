import React, { Component } from 'react';
import { View } from 'react-native';
import connect from 'react-redux/es/connect/connect';
import { PropTypes } from 'prop-types';
import InputWithLabelAndIcon from '../../components/Inputs/InputWithLabelAndIcon';
import ContainerView from '../../components/ContainerView/ContainerView';
import {
  changeAccountType,
  changeEmail, changePassword, changePasswordConfirmation,
} from '../../actions/user';
import ButtonStd from '../../components/Buttons/ButtonStd';
import BackgroundImage from '../../components/Backgrounds/BackgroundImage/BackgroundImage';
import colors from '../../config/colors';
import styles from './styles';
import { signUpUser } from '../../api/user';
import Loader from '../../components/Loaders/Loader/Loader';
import Select from '../../components/Inputs/Select/Select';
import SelectItem from '../../components/Inputs/Select/SelectItem';

const backgroundImage = require('../../../assets/bg-auth.jpg');

class SignUp extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
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

  handlePressSend(user) {
    const { dispatch, navigation } = this.props;
    signUpUser(dispatch, user, navigation);
  }

  handleChangeEmail(email) {
    const { dispatch } = this.props;
    dispatch(changeEmail(email));
  }

  handleChangePassword(password) {
    const { dispatch } = this.props;
    dispatch(changePassword(password));
  }

  handleChangePasswordConfirmation(passwordConfirmation) {
    const { dispatch } = this.props;
    dispatch(changePasswordConfirmation(passwordConfirmation));
  }

  handleChangeAccountType(accountType) {
    const { dispatch } = this.props;
    dispatch(changeAccountType(accountType));
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
          <View style={styles.containerForm}>
            <InputWithLabelAndIcon label="Courriel" iconName="envelope" onChangeText={(text) => { this.handleChangeEmail(text); }} keyboardType="email-address" />
            <InputWithLabelAndIcon label="Mot de passe" iconName="key" onChangeText={(text) => { this.handleChangePassword(text); }} secureTextEntry />
            <InputWithLabelAndIcon label="Confirmation de mot de passe" iconName="key" onChangeText={(text) => { this.handleChangePasswordConfirmation(text); }} secureTextEntry />
            <Select
              label="Vous êtes..."
              selectedValue={() => {
                const { user } = this.props;
                return user.accountType;
              }}
              onValueChange={itemValue => this.handleChangeAccountType(itemValue)}
            >
              <SelectItem label="Cuisinier" value="COOKER" />
              <SelectItem label="Producteur" value="PRODUCER" />
            </Select>
          </View>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
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
        </BackgroundImage>
      </ContainerView>
    );
  }
}

SignUp.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  user: {
    email: state.user.email,
    password: state.user.password,
    password_confirmation: state.user.password_confirmation,
    accountType: state.user.accountType,
  },
});

export default connect(mapStateToProps)(SignUp);
