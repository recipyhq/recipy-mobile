import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { changeEmail } from '../../actions/user';
import ButtonStd from '../../components/Buttons/ButtonStd';
import colors from '../../config/colors';
import styles from './styles';
import style from '../../components/Recipe/style';
import { resetPassword } from '../../api/user';
import MyRecipeItem from '../../components/Recipe/MyRecipeItem';


class MyRecipe extends Component {
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

  handlePressNext() {
    const { navigation } = this.props;
    navigation.navigate('RecipeDescription');
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
      <View style={{ backgroundColor: colors.primaryOrange, flex: 1 }}>
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
        <View style={{ backgroundColor: colors.primaryWhite, flex: 1 }}>
          <Text style={style.pageTitle}>
            Mes recettes
          </Text>
          <MyRecipeItem src="http://leflobart-leportel.fr/wp-content/uploads/2016/08/welsh.png" title="Wesh" view="1k" like="1k" onPress={() => (this.handlePressNext())} />
          <MyRecipeItem src="http://foodandsens.com/wp-content/uploads/2016/09/Capture-d%E2%80%99%C3%A9cran-2016-09-15-%C3%A0-14.35.49.png" title="La grosseur" view="10k" like="200" onPress={() => (this.handlePressNext())} />

        </View>
      </View>
    );
  }
}
MyRecipe.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  user: {
    email: state.user.email,
  },
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(MyRecipe);
