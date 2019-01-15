import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import TextInput from '../components/Inputs/StdTextInput/StdTextInput';
import {
  changeCurrentPassword, changeEmail, changePassword, changePasswordConfirmation,
} from '../actions/user';
import colors from '../config/colors';
import ButtonStd from '../components/Buttons/ButtonStd';
import { editUser } from '../api/user';

const styles = EStyleSheet.create({
  // Back Button
  btnBack: {
    marginTop: 15,
    width: 110,
  },

  // Button Container
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  btnSendForm: {
    padding: 15,
    backgroundColor: colors.primaryGrey,
  },
});

class Profile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(changeEmail(''));
    dispatch(changePassword(''));
    dispatch(changePasswordConfirmation(''));
    dispatch(changeCurrentPassword(''));
  }

  handlePressBack() {
    const { navigation } = this.props;
    navigation.navigate('Settings');
  }

  handleChangeEmail(text) {
    const { dispatch } = this.props;
    dispatch(changeEmail(text));
  }

  handleChangePassword(text) {
    const { dispatch } = this.props;
    dispatch(changePassword(text));
  }

  handleChangePasswordConfirmation(text) {
    const { dispatch } = this.props;
    dispatch(changePasswordConfirmation(text));
  }

  handleChangeCurrentPassword(text) {
    const { dispatch } = this.props;
    dispatch(changeCurrentPassword(text));
  }

  handlePressSend(user) {
    const { dispatch } = this.props;
    editUser(dispatch, user);
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: colors.lightGrey }}>
        <ButtonStd
          onPress={() => (this.handlePressBack())}
          title="Retour"
          leftIcon={{
            name: 'arrow-left',
            color: colors.primaryGrey,
            size: 15,
            type: 'font-awesome',
          }}
          buttonStyle={styles.btnBack}
          transparent
          color={colors.primaryGrey}
          fontSize={20}
        />
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
            style={{ width: 150, height: 150 }}
            borderRadius={100}
          />
        </View>
        <ScrollView style={{ padding: 30 }}>
          <TextInput
            label="Nouvel email"
            value={() => {
              const { user } = this.props;
              return user.email;
            }}
            onChangeText={(text) => { this.handleChangeEmail(text); }}
            keyboardType="email-address"
          />
          <TextInput
            label="Nouveau mot de passe"
            value={() => {
              const { user } = this.props;
              return user.password;
            }}
            onChangeText={(text) => { this.handleChangePassword(text); }}
            secureTextEntry
          />
          <TextInput
            label="Confirmation du nouveau mot de passe"
            value={() => {
              const { user } = this.props;
              return user.password_confirmation;
            }}
            onChangeText={(text) => { this.handleChangePasswordConfirmation(text); }}
            secureTextEntry
          />
          <TextInput
            label="Mot de passe actuel"
            value={() => {
              const { user } = this.props;
              return user.current_password;
            }}
            onChangeText={(text) => { this.handleChangeCurrentPassword(text); }}
            secureTextEntry
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Editer"
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
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email,
      password: state.user.password,
      password_confirmation: state.user.password_confirmation,
      current_password: state.user.current_password,
    },
  };
}

Profile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.any.isRequired,
};

export default connect(mapStateToProps)(Profile);
