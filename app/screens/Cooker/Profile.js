import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PropTypes } from 'prop-types';
import * as SecureStore from 'expo-secure-store';
import ContainerView from '../../components/ContainerView/ContainerView';
import colors from '../../config/colors';
import RecipeListItem from '../../components/Recipe/RecipeList/RecipeListItem/RecipeListItem';
import { getUserRecipeList } from '../../api/recipe';
import Loader from '../../components/Loaders/Loader/Loader';
import { getCurrentUser } from '../../api/user';
import { userDefaultProfileImage } from '../../config/constants';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  scrollViewContainer: { backgroundColor: colors.primaryWhite },
  profilePictureContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 230,
  },
  profilePictureBackground: {
    width: width * 8,
    height: width * 8,
    borderRadius: width * 8,
    backgroundColor: colors.primaryOrange,
    marginTop: (width * -8),
    alignItems: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: 0,
    borderRadius: 150,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 25,
    textAlign: 'center',
    color: colors.primaryGrey,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: colors.primaryGrey,
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.primaryGrey,
    fontWeight: 'bold',
  },
  recipesListError: {
    fontSize: 12,
    color: colors.primaryOrange,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
});

class Profile extends Component {
  componentWillMount() {
    this.fetchCurrentUser();
    this.getRecipesForUser();
  }

  async getRecipesForUser() {
    const { dispatch } = this.props;
    const currentUid = await SecureStore.getItemAsync('userId');
    getUserRecipeList(dispatch, currentUid);
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  get UserFirstName() {
    const { currentUser } = this.props;
    if (currentUser) return currentUser.first_name;
    return null;
  }

  get UserProfileImage() {
    const { currentUser } = this.props;
    return (currentUser && currentUser.url) ? currentUser.url : userDefaultProfileImage;
  }

  static get defaultProps() {
    return {
      profileRecipes: [],
      currentUser: null,
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      profileRecipes: PropTypes.array,
      profileRecipesErrorText: PropTypes.string.isRequired,
      currentUser: PropTypes.shape({
        email: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        url: PropTypes.string,
      }),
    };
  }

  fetchCurrentUser() {
    const { dispatch } = this.props;
    getCurrentUser(dispatch);
  }

  render() {
    const { profileRecipes, profileRecipesErrorText } = this.props;
    return (
      <ContainerView>
        <Loader isLoading={this.isLoading} />
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePictureBackground}>
              <Image
                style={styles.profilePicture}
                source={{ uri: this.UserProfileImage }}
              />
            </View>
          </View>
          <Text style={styles.profileName}>
            {this.UserFirstName}
          </Text>
          <Text style={styles.sectionTitle}>DERNIERES RECETTES</Text>
          {
            profileRecipes.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)
          }
          <Text style={styles.recipesListError}>
            {profileRecipesErrorText}
          </Text>
        </ScrollView>
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileRecipes: state.recipe.profileRecipes,
    isLoading: state.user.isLoading,
    profileRecipesErrorText: state.recipe.profileRecipesErrorText,
    currentUser: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Profile);
