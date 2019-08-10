/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, View, ScrollView, Text,
} from 'react-native';
import { PropTypes } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Input } from 'react-native-elements';
import TextInput from '../../components/Inputs/StdTextInput/StdTextInput';
import {
  changeCurrentPassword, changeEmail, changePassword, changePasswordConfirmation,
} from '../../actions/user';
import colors from '../../config/colors';
import ButtonStd from '../../components/Buttons/ButtonStd';
import { editUser } from '../../api/user';
import Loader from '../../components/Loaders/Loader/Loader';
import { userDefaultProfileImage } from '../../config/user';
import ContainerView from '../../components/ContainerView/ContainerView';

const styles = EStyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryOrange,
    marginBottom: 20,
  },
  container: {
    margin: 30,
  },
  btnSendForm: {
    backgroundColor: colors.primaryGrey,
    padding: 15,
    marginTop: 20,
  },
  profilePicture: {
    width: 130,
    height: 130,
  },
});

class ProfileEdit extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(changeEmail(''));
    dispatch(changePassword(''));
    dispatch(changePasswordConfirmation(''));
    dispatch(changeCurrentPassword(''));
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  get UserProfileImage() {
    const { currentUser } = this.props;
    return (currentUser && currentUser.url) ? currentUser.url : userDefaultProfileImage;
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

  handlePressSend(user, errorManager) {
    const { dispatch } = this.props;
    editUser(dispatch, user, errorManager);
  }

  render() {
    return (
      <ContainerView>
        <Loader isLoading={this.isLoading} />
        <View style={styles.container}>
          <Image
            source={{ uri: this.UserProfileImage }}
            style={styles.profilePicture}
            borderRadius={100}
          />
          <Input label="Prénom" value={this.props.user.first_name} onChangeText={(text) => { this.handleChangeFirstName(text); }} placeholder={this.props.currentUser.first_name} />
          <Input label="Nom" value={this.props.user.last_name} onChangeText={(text) => { this.handleChangeLastName(text); }} placeholder={this.props.currentUser.last_name} />
          <Input label="Courriel" value={this.props.user.email} onChangeText={(text) => { this.handleChangeEmail(text); }} keyboardType="email-address" placeholder={this.props.currentUser.email} />
          <Input label="Mot de passe" value={this.props.user.password} onChangeText={(text) => { this.handleChangePassword(text); }} secureTextEntry placeholder="**********" />
          <Input label="Confirmation de mot de passe" value={this.props.user.password_confirmation} onChangeText={(text) => { this.handleChangePasswordConfirmation(text); }} secureTextEntry placeholder="**********" />
          <Input label="Mot de passe actuel *" value={this.props.user.current_password} onChangeText={(text) => { this.handleChangeCurrentPassword(text); }} secureTextEntry />
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <ButtonStd
                title="Modifier mon profil"
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

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email,
      password: state.user.password,
      password_confirmation: state.user.password_confirmation,
      current_password: state.user.current_password,
    },
    currentUser: state.user.currentUser,
    isLoading: state.user.isLoading,
  };
}

ProfileEdit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentUser: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errorManager: PropTypes.object,
  isLoading: PropTypes.bool,
};

ProfileEdit.defaultProps = {
  errorManager: {
    current_password: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  isLoading: false,
};

export default connect(mapStateToProps)(ProfileEdit);
