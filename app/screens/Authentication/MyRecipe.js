import React, { Component } from 'react';
import {
  Text, SectionList,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { changeEmail } from '../../actions/user';
import ContainerView from '../../components/ContainerView/ContainerView';
import ButtonStd from '../../components/Buttons/ButtonStd';
import BackgroundImage from '../../components/Backgrounds/BackgroundImage/BackgroundImage';
import colors from '../../config/colors';
import styles from './styles';
import { resetPassword } from '../../api/user';


const backgroundImage = require('../../../assets/bg-auth.jpg');

class ForgottenPassword extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
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
    navigation.navigate('Home');
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
          <SectionList
            sections={[
              { title: 'D', data: ['Devin', 'Damn', 'Daniel'] },
              { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
            ]}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={
              ({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>
            }
            keyExtractor={(item, index) => index}
          />
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
