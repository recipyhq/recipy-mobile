import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { PropTypes } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import ContainerView from '../components/ContainerView/ContainerView';
import TextInput from '../components/Inputs/StdTextInput/StdTextInput';
import { changeEmail } from '../actions/user';
import colors from '../config/colors';
import ButtonStd from '../components/Buttons/ButtonStd';

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
  handlePressBack() {
    const { navigation } = this.props;
    navigation.navigate('Settings');
  }

  handleChangeEmail(text) {
    const { dispatch } = this.props;
    dispatch(changeEmail(text));
  }

  render() {
    return (
      <ContainerView style={{ backgroundColor: colors.lightGrey }}>
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
            style={{ width: 200, height: 200 }}
            borderRadius={100}
          />
        </View>
        <View style={{ padding: 30 }}>
          <TextInput
            label="Prénom"
          />
          <TextInput
            label="Email"
            value={() => {
              const { user } = this.props;
              return user.email;
            }}
            onChangeText={(text) => { this.handleChangeEmail(text); }}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Editer"
              onPress={() => {
                // const { user } = this.props;
                // this.handlePressSend(user);
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
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
